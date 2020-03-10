import * as Generator from 'yeoman-generator';

import {GatheredData} from './interfaces';
import {copyTpl} from '../utils';

/**
 * Angular lazy route module subgenerator
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
    }

    /**
     * Writes files to disk
     */
    public async writing()
    {
    }

    /**
     * End of generating of app
     */
    public end()
    {
    }

    //######################### private methods #########################

    /**
     * Copy template and replace handlebars from context
     * @param templatePath Path to template
     * @param destinationPath Destination path
     * @param context Object context that is used for template replacement
     */
    private _copyTpl(templatePath: string, destinationPath: string, context: any)
    {
        copyTpl(this, templatePath, destinationPath, context);
    }
}