import * as Generator from 'yeoman-generator';
import * as chalk from 'chalk';
import * as path from 'path';
import {nameof} from '@jscrpt/common';
import {Project} from "ts-morph";

import {GatheredData, AngularModuleContentsType} from './interfaces';
import {copyTpl, prepareNames} from '../utils';
import {CommandLineOptions} from '../shared.interfaces';

const MODULES_PATH = 'app/modules';

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

    //######################### constructor #########################

    // The name `constructor` is important here
    constructor(args: string | string[], opts: {})
    {
        super(args, opts);

        let options: CommandLineOptions = this.options;;

        if(options.help)
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
        let templateContext = {...prepareNames(this._gatheredData.moduleName), ...this._gatheredData};
        let $copyTpl = (templatePath: string, destinationPath: string, context: any) => copyTpl(this, templatePath, destinationPath, context);

        //generating component
        if(this._gatheredData.type == 'component')
        {
            $copyTpl('components/index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/components/index.ts`), templateContext);
            $copyTpl('components/template/template.component.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/components/${templateContext.name}/${templateContext.name}.component.ts`), templateContext);
            this.fs.copy(this.templatePath('components/template/template.component.scss'), this.destinationPath(path.join(MODULES_PATH, `${templateContext.name}/components/${templateContext.name}/${templateContext.name}.component.scss`)));
            this.fs.copy(this.templatePath('components/template/template.component.html'), this.destinationPath(path.join(MODULES_PATH, `${templateContext.name}/components/${templateContext.name}/${templateContext.name}.component.html`)));
        }

        //generating directive
        if(this._gatheredData.type == 'directive')
        {
            $copyTpl('directives/index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/directives/index.ts`), templateContext);
            $copyTpl('directives/template/template.directive.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/directives/${templateContext.name}/${templateContext.name}.directive.ts`), templateContext);
        }

        //generating pipe
        if(this._gatheredData.type == 'pipe')
        {
            $copyTpl('pipes/index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/pipes/index.ts`), templateContext);
            $copyTpl('pipes/template/template.pipe.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/pipes/${templateContext.name}/${templateContext.name}.pipe.ts`), templateContext);
        }

        //generating module and index
        $copyTpl('index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/index.ts`), templateContext);
        $copyTpl('modules/index.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/modules/index.ts`), templateContext);
        $copyTpl('modules/template.module.ts.hbs', path.join(MODULES_PATH, `${templateContext.name}/modules/${templateContext.name}.module.ts`), templateContext);

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        const project = new Project();

        if(!this.fs.exists(this.destinationPath(`${MODULES_PATH}/index.ts`)))
        {
            this.fs.write(this.destinationPath(`${MODULES_PATH}/index.ts`), '');
        }

        project.addSourceFileAtPath(this.destinationPath(`${MODULES_PATH}/index.ts`));

        project.getSourceFile(`${MODULES_PATH}/index.ts`)?.addExportDeclaration(
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
}