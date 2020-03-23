import * as chalk from 'chalk';

import {AnglrPackages} from '../interfaces/types';
import {FeatureBase} from '../featureBase';

/**
 * Represents feature modifications for switching enabling/disabling git version
 */
export class GitVersionFeature extends FeatureBase
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
     * Runs postprocessing for this, it is called after all files have been written
     */
    public postprocess(): void
    {
        if(this._enabled)
        {
            //create git repository if not exists and setup version branch
            if(!this._generator.fs.exists(this._generator.destinationPath('.git')))
            {
                this._generator.spawnCommandSync('git', ['init']);
            }

            this._generator.spawnCommandSync('git', ['checkout', '-b', '1.0']);
            this._generator.spawnCommandSync('git', ['add', '.']);
            this._generator.spawnCommandSync('git', ['commit', '-m', 'INT: initial files for project']);

            this._generator.log(chalk.green(`Git repository initialized sucessfuly`));
        }
    }
}