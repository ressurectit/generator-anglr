import * as Generator from 'yeoman-generator';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import * as path from 'path';
import {nameof} from '@jscrpt/common';
import {Project} from "ts-morph";

import {GatheredData, AngularModuleContentsType, AvailableNames} from './interfaces';

const MODULES_PATH = 'app/modules';

Handlebars.registerHelper('ifEquals', function(this: any, arg1, arg2, options)
{
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// Handlebars.registerHelper('startWithCurlyBraces', function(text)
// {
//     var result = '{' + text;
    
//     return new Handlebars.SafeString(result);
// });

/**
 * Angular module subgenerator
 */
module.exports = class AnglrModuleGenerator extends Generator
{
    //######################### private fields #########################

    /**
     * Gathered data from user
     */
    private _gatheredData!: GatheredData;

    //######################### public properties #########################

    /**
     * Gets gathered data from user
     */
    public get gatheredData(): GatheredData
    {
        return this._gatheredData;
    }
    
    //######################### constructor #########################

    // The name `constructor` is important here
    constructor(args: string | string[], opts: {}) 
    {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
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
                //TODO - add validation or tranformation
                type: 'input',
                name: nameof<GatheredData>('moduleName'),
                message: 'Name of new module'
            },
            {
                type: 'list',
                name: nameof<GatheredData>('type'),
                message: 'Type of item to be created for module',
                choices: <Array<AngularModuleContentsType>>['component', 'directive', 'pipe']
            }
            //TODO - add comment input
            //TODO - add input output type for pipe
        ]);
    }

    /**
     * Writes files to disk
     */
    public async writing()
    {
        let templateContext = {...this._prepareNames(this._gatheredData.moduleName), ...this._gatheredData};

        //generating component
        if(this._gatheredData.type == 'component')
        {
            this._copyTpl('components/index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/components/index.ts`), templateContext);
            this._copyTpl('components/template/template.component.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/components/${templateContext.name}/${templateContext.name}.component.ts`), templateContext);
            this.fs.copy(this.templatePath('components/template/template.component.scss'), this.destinationPath(path.join(MODULES_PATH, `${templateContext.name}/components/${templateContext.name}/${templateContext.name}.component.scss`)));
            this.fs.copy(this.templatePath('components/template/template.component.html'), this.destinationPath(path.join(MODULES_PATH, `${templateContext.name}/components/${templateContext.name}/${templateContext.name}.component.html`)));
        }

        //generating directive
        if(this._gatheredData.type == 'directive')
        {
            this._copyTpl('directives/index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/directives/index.ts`), templateContext);
            this._copyTpl('directives/template/template.directive.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/directives/${templateContext.name}/${templateContext.name}.directive.ts`), templateContext);
        }

        //generating pipe
        if(this._gatheredData.type == 'pipe')
        {
            this._copyTpl('pipes/index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/pipes/index.ts`), templateContext);
            this._copyTpl('pipes/template/template.pipe.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/pipes/${templateContext.name}/${templateContext.name}.pipe.ts`), templateContext);
        }

        //generating module and index
        this._copyTpl('index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/index.ts`), templateContext);
        this._copyTpl('modules/index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/modules/index.ts`), templateContext);
        this._copyTpl('modules/template.module.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/modules/${templateContext.name}.module.ts`), templateContext);

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        const project = new Project();
        project.addSourceFileAtPath(this.destinationPath('app/modules/index.ts'));

        project.getSourceFile('app/modules/index.ts')?.addExportDeclaration(
        {
            moduleSpecifier: `./${templateContext.name}`
        });

        await project.save();
    }

    /**
     * End of generating of app
     */
    public end()
    {
        this.log(chalk.green(`Angular module '${this._gatheredData.moduleName}' was generated`));
        this.log(chalk.whiteBright('To use it, you have to add it to ') + chalk.whiteBright.bold('import') + chalk.whiteBright(' of desired module.'));
    }

    //######################### private methods #########################

    /**
     * Creates all available names from name
     * @param name Name to be changed to available names
     */
    private _prepareNames(name: string): AvailableNames
    {
        return {
            name: name,
            normalizedName: name.replace(/[A-Z]/g, (str => `-${str.toLowerCase()}`)),
            capitalizedName: name[0].toUpperCase() + name.substr(1)
        };
    }

    /**
     * Copy template and replace handlebars from context
     * @param templatePath Path to template
     * @param destinationPath Destination path
     * @param context Object context that is used for template replacement
     */
    private _copyTpl(templatePath: string, destinationPath: string, context: any)
    {
        let template = Handlebars.compile(this.fs.read(this.templatePath(templatePath)));
            
        this.fs.write(this.destinationPath(destinationPath), template(context));
    }
}