import {SyntaxKind} from 'typescript';

import {AnglrPackages} from '../interfaces/types';
import {FeatureBase} from '../featureBase';

/**
 * Represents feature modifications for switching between es5 and es2015
 */
export class Es2015Feature extends FeatureBase
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

        //update package.json
        let packageJson = this._readPackageJson();

        packageJson.scripts['build'] = packageJson.scripts['build'].replace('webpack', 'webpack --env.es5');
        packageJson.scripts['build:min'] = packageJson.scripts['build:min'].replace('webpack', 'webpack --env.es5');
        packageJson.scripts['build:prepare:dev'] += ' --env.es5';

        this._setPackageJson(packageJson);

        //update server.js
        let sourceFile = this._getSourceFile('server.js');

        if(sourceFile)
        {
            //find require call statement
            sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)
                .filter(call => call.getExpression().getText() == 'require' && call.getArguments()[0]?.getText() == `'./webpack.config.js'`)
                .forEach(call =>
                {
                    let parentCall = call.getFirstAncestorByKind(SyntaxKind.CallExpression);

                    //parent containing object with params
                    if(parentCall)
                    {
                        let objs = parentCall.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression);

                        if(objs.length)
                        {
                            //add es5 property set to true
                            objs[0].addPropertyAssignment(
                            {
                                name: 'es5',
                                initializer: 'true'
                            });
                        }
                    }
                });

            sourceFile.saveSync();
        }

    }
}