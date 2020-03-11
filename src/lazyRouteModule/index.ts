import * as Generator from 'yeoman-generator';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import {nameof} from '@jscrpt/common';
import {Project, VariableStatement, VariableDeclaration, ObjectLiteralExpression, PropertyAssignment, ArrayLiteralExpression} from "ts-morph";

import {GatheredData, LazyRouteModuleOptions} from './interfaces';
import {prepareNames, copyTpl} from '../utils';

/**
 * Angular lazy route module subgenerator
 */
module.exports = class AnglrLazyRouteModuleGenerator extends Generator
{
    //######################### private fields #########################

    /**
     * Gathered data from user
     */
    private _gatheredData!: GatheredData;

    /**
     * Current options for application
     */
    private _options: LazyRouteModuleOptions;

    //######################### constructor #########################

    // The name `constructor` is important here
    constructor(args: string | string[], opts: {})
    {
        super(args, opts);

        this.option('rootRoutesFile',
        {
            alias: 'f',
            description: `Path to root routes file, contains 'pages' that are part of top level routes`,
            default: 'app/boot/app.component.routes.ts',
            type: String
        });

        this.option('rootRoutesOptionsName',
        {
            alias: 'o',
            description: `Name of constant storing root routes module options`,
            default: 'routesOptions',
            type: String
        });

        this.option('pagesPath',
        {
            alias: 'p',
            description: `Path to directory containing pages`,
            default: 'app/pages',
            type: String
        });

        this._options = this.options as LazyRouteModuleOptions;

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
     * Prompts user for configuration
     */
    public async prompting(): Promise<void>
    {
        this._gatheredData = await this.prompt(
        [
            {
                type: 'input',
                name: nameof<GatheredData>('moduleName'),
                message: 'Name of new lazy module'
            },
            {
                type: 'input',
                name: nameof<GatheredData>('route'),
                message: 'Route path for new module'
            }
        ]);
    }

    /**
     * Writes files to disk
     */
    public async writing(): Promise<void>
    {
        let templateContext = {...prepareNames(this._gatheredData.moduleName), ...this._gatheredData, ...{pagesPath: this._options.pagesPath}};
        let $copyTpl = (templatePath: string, destinationPath: string, context: any) => copyTpl(this, templatePath, destinationPath, context);

        //test existance of pages path
        if(!fs.existsSync(this.destinationPath(this._options.pagesPath)))
        {
            this.log(chalk.yellow(`Path to pages '${this._options.pagesPath}' does not exists.`));
        }

        $copyTpl('template.module.ts.hbs', path.join(this._options.pagesPath, `+${templateContext.name}/${templateContext.name}.module.ts`), templateContext);
        $copyTpl('template.routes.ts.hbs', path.join(this._options.pagesPath, `+${templateContext.name}/${templateContext.name}.routes.ts`), templateContext);

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        //test root route file
        if(this.fs.exists(this.destinationPath(this._options.rootRoutesFile)))
        {
            const project = new Project();
            project.addSourceFileAtPath(this.destinationPath(this._options.rootRoutesFile));
    
            let file = project.getSourceFile(this._options.rootRoutesFile);

            let routesOptions: VariableDeclaration|undefined;

            file?.getStatements().forEach(statement =>
            {
                if(statement instanceof VariableStatement)
                {
                    statement.getDeclarationList().forEachChild(declaration =>
                    {
                        if(declaration instanceof VariableDeclaration)
                        {
                            if(declaration.getName() == this._options.rootRoutesOptionsName)
                            {
                                routesOptions = declaration;
                            }
                        }
                    })
                }
            });

            if(!routesOptions)
            {
                this.log(chalk.yellow(`Routes options variable '${this._options.rootRoutesOptionsName}' does not exists.`));
            }
            else
            {
                let staticRoutesBefore: PropertyAssignment|undefined;
                let initializer = routesOptions.getInitializer() as ObjectLiteralExpression;

                initializer.getProperties().forEach(prop =>
                {
                    let property = prop as PropertyAssignment;

                    if(property.getName() == 'staticRoutesBefore')
                    {
                        staticRoutesBefore = property;
                    }
                });

                //no static routes before yet
                if(!staticRoutesBefore)
                {
                    staticRoutesBefore = initializer.addPropertyAssignment(
                    {
                        name: 'staticRoutesBefore',
                        initializer: 
`[

]`
                    });
                }

                let routesArray = staticRoutesBefore.getInitializer() as ArrayLiteralExpression;

                routesArray.addElement(
                //TODO - think of generating correct relative path for pages module
`{
    path: '${this._gatheredData.route}',
    loadChildren: () => import('../pages/+${templateContext.name}/${templateContext.name}.module').then(({${templateContext.capitalizedName}Module}) => ${templateContext.capitalizedName}Module)
}`);

            }

            await project.save();
        }
        else
        {
            this.log(chalk.yellow(`Path to root routes '${this._options.rootRoutesFile}' does not exists.`));
        }
    }

    /**
     * End of generating of app
     */
    public end(): void
    {
        this.log(chalk.green(`Angular lazy module '${this._gatheredData.moduleName}' was generated`));
        this.log(chalk.whiteBright(`New module is available at '${this._gatheredData.route}' route path.`));
    }
}