import {AnglrBuildBlockGenerator} from '../buildBlockGenerator';

/**
 * Angular directive subgenerator
 */
module.exports = class AnglrDirectiveGenerator extends AnglrBuildBlockGenerator
{
    //######################### constructor #########################
    constructor(args: string | string[], opts: {})
    {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts, 'directive');
    }

    //######################### public methods - phases #########################

    /**
     * Initializing and gathering data from project
     */
    public initializing(): void
    {
        super.initializing();
    }

    /**
     * Prompts user for configuration
     */
    public async prompting(): Promise<void>
    {
        await super.prompting();
    }

    /**
     * Writes files to disk
     */
    public async writing(): Promise<void>
    {
        await super.writing();
    }

    /**
     * End of generating of app
     */
    public end(): void
    {
        super.end();
    }
}