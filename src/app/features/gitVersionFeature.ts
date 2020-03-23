import {CallExpression} from "ts-morph";
import {SyntaxKind} from 'typescript';
import * as chalk from 'chalk';
import * as path from 'path';

import {AnglrPackages} from '../interfaces/types';
import {FeatureBase} from '../featureBase';

const GIT_PACKAGE = '@kukjevov/gulp-git-version';
const PREPARE_VERSION_FUNC = 'prepareVersion';

/**
 * Represents feature modifications for switching enabling/disabling git version
 */
export class GitVersionFeature extends FeatureBase
{
    //######################### public properties #########################

    /**
     * Array of packages that is this dependend on
     */
    public static get dependsOnPackages(): AnglrPackages[]
    {
        return [];
    }

    /**
     * Array of packages that should be deleted when this is not used
     */
    public static get cascadeDelete(): AnglrPackages[]
    {
        return [];
    }

    //######################### public methods #########################

    /**
     * Runs code that enable this
     */
    public enable(): void
    {
        super.enable();
    }

    /**
     * Runs code that disable this
     */
    public disable(): void
    {
        super.disable();

        //TODO - possible rework, creates packages class for @kukjevov/gulp-git-version
        //remove dev dependency
        this._removePackageJsonDevDependency(GIT_PACKAGE);

        //update .gitignore
        let gitignore = this._generator.fs.read(this._generator.destinationPath('.gitignore'));
        gitignore = gitignore.replace(/\*\*\/config\/version\.json\s+/, '');
        this._generator.fs.write(this._generator.destinationPath('.gitignore'), gitignore);

        //generate version.json
        this._generator.fs.write(this._generator.destinationPath(path.join('config', 'version.json')), 
`{
    "version": "1.0.0"
}`);

        //update gulpfile
        let sourceFile = this._getSourceFile('gulpfile.js');

        if(sourceFile)
        {
            //find require statement
            sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration)
                .filter(varDeclaration => varDeclaration.getInitializer() instanceof CallExpression)
                .forEach(varDeclaration =>
                {
                    let requireStatement = varDeclaration.getInitializer() as CallExpression;
                    let args = requireStatement.getArguments();

                    if(args.length)
                    {
                        //remove require statement
                        if(args[0].getText().indexOf(GIT_PACKAGE) >= 0)
                        {
                            varDeclaration.remove();
                        }
                    }
                });

            //find prepareVersion func
            sourceFile.getDescendantsOfKind(SyntaxKind.FunctionDeclaration)
                .forEach(func =>
                {
                    //remove prepareVersion func
                    if(func.getName() == PREPARE_VERSION_FUNC)
                    {
                        func.remove();
                    }
                });

            //find prepareVersion usage
            sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)
                .forEach(identifier =>
                {
                    //remove prepareVersion usage
                    if(identifier.getText() == PREPARE_VERSION_FUNC)
                    {
                        (identifier.getParent() as CallExpression).removeArgument(identifier);
                    }
                });

            sourceFile.saveSync();
        }
    }

    /**
     * Runs postprocessing for this, it is called after all files have been written
     */
    public postprocess(): void
    {
        if(this._enabled)
        {
            //create git repository if not exists and setup version branch
            if(!this._generator.fs.exists(this._generator.destinationPath('.git')))
            {
                this._generator.spawnCommandSync('git', ['init']);
            }

            this._generator.spawnCommandSync('git', ['checkout', '-b', '1.0']);
            this._generator.spawnCommandSync('git', ['add', '.']);
            this._generator.spawnCommandSync('git', ['commit', '-m', 'INT: initial files for project']);

            this._generator.log(chalk.green(`Git repository initialized sucessfuly`));
        }
    }
}