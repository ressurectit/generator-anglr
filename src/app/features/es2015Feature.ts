import {AnglrPackages} from '../interfaces/types';
import {FeatureBase} from '../featureBase';

/**
 * Represents feature modifications for switching between es5 and es2015
 */
export class Es2015Feature extends FeatureBase
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
}