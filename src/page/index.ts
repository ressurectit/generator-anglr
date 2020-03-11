import * as Generator from 'yeoman-generator';

import {GatheredData, PageOptions} from './interfaces';

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
        // this._lazyModules = getDirectories(this.destinationPath(this._options.pagesPath)).filter(itm => itm.startsWith('+'));
        console.log(this._lazyModules);
    }

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
}