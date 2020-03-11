import * as Generator from 'yeoman-generator';
import {nameof} from '@jscrpt/common';

import {GatheredData, LazyRouteModuleOptions} from './interfaces';

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

    /**
     * Current options for application
     */
    private _options: LazyRouteModuleOptions;

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
        super(args, opts);

        this.option('rootRoutesFile',
        {
            alias: 'f',
            description: `Path to root routes file, contains 'pages' that are part of top level routes`,
            default: 'app/boot/app.component.routes.ts',
            type: String
        });

        this.option('rootRoutesOptionsConst',
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
    public writing(): void
    {
    }

    /**
     * End of generating of app
     */
    public end(): void
    {
    }
}