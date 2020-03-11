import * as Generator from 'yeoman-generator';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import {nameof} from '@jscrpt/common';
import {Project, SourceFile, VariableDeclaration, VariableStatement, ArrayLiteralExpression} from "ts-morph";

import {GatheredData, PageOptions} from './interfaces';
import {getDirectories, prepareNames, copyTpl} from '../utils';

const ROOT_MODULE = 'ROOT';

/**
 * Angular page component subgenerator
 */
module.exports = class AnglrPageComponentGenerator extends Generator
{
    //######################### private fields #########################

    /**
     * Gathered data from user
     */
    private _gatheredData!: GatheredData;

    /**
     * Current options for application
     */
    private _options: PageOptions;

    /**
     * Array of existing lazy modules
     */
    private _lazyModules: string[] = [];

    //######################### constructor #########################

    // The name `constructor` is important here
    constructor(args: string | string[], opts: {})
    {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.option('rootRoutesFile',
                    {
                        alias: 'f',
                        description: `Path to root routes file, contains 'pages' that are part of top level routes`,
                        default: 'app/boot/app.component.routes.ts',
                        type: String
                    })
            .option('routesFile',
                    {
                        alias: 'r',
                        description: `Name of routes file, contains 'pages' that are part of specified module routes, can use '{{moduleName}}' for replacement`,
                        default: '{{moduleName}}.routes.ts',
                        type: String
                    })
            .option('componentsArrayName',
                    {
                        alias: 'c',
                        description: `Name of constant storing array of pages for router module`,
                        default: 'components',
                        type: String
                    })
            .option('pagesPath',
                    {
                        alias: 'p',
                        description: `Path to directory containing pages`,
                        default: 'app/pages',
                        type: String
                    });

        this._options = this.options as PageOptions;

        if(this._options.help)
        {
            console.log(this.usage());
            console.log('Options:');
            console.log(this.optionsHelp());

            process.exit(0);
        }
    }

    //######################### public methods - phases #########################

    /**
     * Initializing and gathering data from project
     */
    public initializing(): void
    {
        this._lazyModules = getDirectories(this.destinationPath(this._options.pagesPath)).filter(itm => itm.startsWith('+'));
    }

    /**
     * Prompts user for configuration
     */
    public async prompting(): Promise<void>
    {
        this._gatheredData = await this.prompt(
        [
            {
                type: 'input',
                name: nameof<GatheredData>('pageName'),
                message: 'Name of new page component'
            },
            {
                type: 'input',
                name: nameof<GatheredData>('route'),
                message: 'Route path for new page'
            },
            {
                type: 'input',
                name: nameof<GatheredData>('permission'),
                message: 'Name of permission required for displaying page'
            },
            {
                type: 'list',
                name: nameof<GatheredData>('module'),
                message: 'Name of module which will include this page component',
                choices: [ROOT_MODULE, ...this._lazyModules]
            }
        ]);
    }

    /**
     * Writes files to disk
     */
    public async writing(): Promise<void>
    {
        //test existance of pages path
        if(!fs.existsSync(this.destinationPath(this._options.pagesPath)))
        {
            this.log(chalk.yellow(`Path to pages '${this._options.pagesPath}' does not exists, skipping generation.`));

            process.exit(0);
        }

        let templateContext = {...prepareNames(this._gatheredData.pageName), ...this._gatheredData, ...{pagesPath: this._options.pagesPath}};
        let $copyTpl = (templatePath: string, destinationPath: string, context: any) => copyTpl(this, templatePath, destinationPath, context);

        let destPath = [templateContext.pagesPath];

        //add lazy module path
        if(templateContext.module != ROOT_MODULE)
        {
            destPath.push(templateContext.module);
        }

        let destPathString = path.join.apply(null, destPath);

        $copyTpl('template.component.ts.hbs', path.join(destPathString, `${templateContext.name}/${templateContext.name}.component.ts`), templateContext);
        this.fs.copy(this.templatePath('template.component.scss'), this.destinationPath(path.join(destPathString, `${templateContext.name}/${templateContext.name}.component.scss`)));
        this.fs.copy(this.templatePath('template.component.html'), this.destinationPath(path.join(destPathString, `${templateContext.name}/${templateContext.name}.component.html`)));

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        //handle root page component
        if(templateContext.module == ROOT_MODULE)
        {
            //test root route file
            if(this.fs.exists(this.destinationPath(this._options.rootRoutesFile)))
            {
                const project = new Project();
                project.addSourceFileAtPath(this.destinationPath(this._options.rootRoutesFile));

                //TODO - compute relative path
                let file = project.getSourceFile(this._options.rootRoutesFile);

                this._updateComponentsArray(file!, `${templateContext.capitalizedName}Component`, `../pages/${templateContext.name}/${templateContext.name}.component`);

                await project.save();
            }
            else
            {
                this.log(chalk.yellow(`Path to root routes '${this._options.rootRoutesFile}' does not exists.`));
            }
        }
        //handle lazy module page component
        else
        {
            let modulePath = path.join(destPathString, this._options.routesFile.replace('{{moduleName}}', templateContext.module.replace('+', '')));

            //test lazy module route file
            if(this.fs.exists(this.destinationPath(modulePath)))
            {
                const project = new Project();
                project.addSourceFileAtPath(this.destinationPath(modulePath));

                let file = project.getSourceFile(modulePath);

                this._updateComponentsArray(file!, `${templateContext.capitalizedName}Component`, `./${templateContext.name}/${templateContext.name}.component`);

                await project.save();
            }
            else
            {
                this.log(chalk.yellow(`Path to lazy module routes '${modulePath}' does not exists.`));
            }
        }
    }

    /**
     * End of generating of app
     */
    public end(): void
    {
        this.log(chalk.green(`Angular page component '${this._gatheredData.pageName}' was generated`));
        this.log(chalk.whiteBright(`New page component is available at '${this._gatheredData.route}' route path.`));
    }

    //######################### private methods #########################

    /**
     * Adds component to array of components for routing
     * @param sourceFile Object of source file
     * @param componentName Name of component to be added
     * @param path Path for importing component
     */
    private _updateComponentsArray(sourceFile: SourceFile, componentName: string, path: string): void
    {
        let components: VariableDeclaration|undefined;

        sourceFile.getStatements().forEach(statement =>
        {
            if(statement instanceof VariableStatement)
            {
                statement.getDeclarationList().forEachChild(declaration =>
                {
                    if(declaration instanceof VariableDeclaration)
                    {
                        if(declaration.getName() == this._options.componentsArrayName)
                        {
                            components = declaration;
                        }
                    }
                })
            }
        });

        if(!components)
        {
            this.log(chalk.yellow(`Components variable '${this._options.componentsArrayName}' does not exists, update will be skipped.`));

            return;
        }

        let array = components.getInitializer() as ArrayLiteralExpression;

        if(!(array instanceof ArrayLiteralExpression))
        {
            this.log(chalk.yellow(`Components variable '${this._options.componentsArrayName}' is not an array, update will be skipped.`));

            return;
        }
        
        array.insertElement(0, componentName);

        sourceFile.addImportDeclaration(
        {
            namedImports: [componentName],
            moduleSpecifier: path
        });
    }
}