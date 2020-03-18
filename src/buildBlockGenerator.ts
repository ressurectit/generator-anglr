import {nameof} from '@jscrpt/common';
import * as Generator from 'yeoman-generator';
import * as chalk from 'chalk';
import * as path from 'path';
import * as inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt';

import {PathQuestion, BuildBlockGatheredData, AngularBuildBlockType} from './shared.interfaces';
import {prepareNames, copyTpl} from './utils';

/**
 * Angular build block base subgenerator
 */
export class AnglrBuildBlockGenerator extends Generator
{
    //######################### protected fields #########################

    /**
     * Gathered data from user
     */
    protected _gatheredData!: BuildBlockGatheredData;

    //######################### constructor #########################
    constructor(args: string | string[], opts: {}, protected _type: AngularBuildBlockType)
    {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        if(this.options.help)
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
        this.env.adapter.promptModule.registerPrompt('file-tree-selection', inquirerFileTreeSelection);
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
                name: nameof<BuildBlockGatheredData>('name'),
                message: `Name of new ${this._type}`,
            },
            <PathQuestion>
            {
                type: 'file-tree-selection',
                name: nameof<BuildBlockGatheredData>('path'),
                message: `Path for new ${this._type}`,
                onlyShowDir: true,
                root: 'app'
            } as any
        ]);
    }

    /**
     * Writes files to disk
     */
    public async writing(): Promise<void>
    {
        let templateContext = {...prepareNames(this._gatheredData.name), ...this._gatheredData};
        let $copyTpl = (templatePath: string, destinationPath: string, context: any) => copyTpl(this, templatePath, destinationPath, context);

        $copyTpl(`template.${this._type}.ts.hbs`, path.join(templateContext.path, templateContext.name, `${templateContext.name}.${this._type}.ts`), templateContext);

        if(this._type == 'component')
        {
            this.fs.copy(this.templatePath(`template.${this._type}.scss`), this.destinationPath(path.join(templateContext.path, templateContext.name, `${templateContext.name}.${this._type}.scss`)));
            this.fs.copy(this.templatePath(`template.${this._type}.html`), this.destinationPath(path.join(templateContext.path, templateContext.name, `${templateContext.name}.${this._type}.html`)));
        }

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });
    }

    /**
     * End of generating of app
     */
    public end(): void
    {
        this.log(chalk.green(`Angular ${this._type} '${this._gatheredData.name}' was generated`));
        this.log(chalk.whiteBright(`New ${this._type} is available at '${this._gatheredData.path}' path.`));
    }
}