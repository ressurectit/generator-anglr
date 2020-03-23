import * as chalk from 'chalk';

import {AnglrBase} from './anglrBase';

/**
 * Base class for feature installation
 */
export abstract class FeatureBase extends AnglrBase
{
    //######################### public methods #########################

    /**
     * Runs code that enable this
     */
    public enable(): void
    {
        console.log(chalk.whiteBright(`Enabling feature '${this._name}'`));

        this._enabled = true;
    }

    /**
     * Runs code that disable this
     */
    public disable(): void
    {
        console.log(chalk.whiteBright(`Disabling feature '${this._name}'`));
    }

    //######################### protected methods #########################
}