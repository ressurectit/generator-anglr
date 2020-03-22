import {PackageBase} from '../packageBase';
import {AnglrPackages} from '../interfaces/types';

/**
 * Represents package modifications for jscrpt common
 */
export class JscrptCommonPackage extends PackageBase
{
    //######################### public properties #########################

    /**
     * Array of packages that is this package dependend on
     */
    public static get dependsOnPackages(): AnglrPackages[]
    {
        return ['extend'];
    }

    /**
     * Array of packages that should be deleted when this one is not used
     */
    public static get cascadeDelete(): AnglrPackages[]
    {
        return ['extend'];
    }

    //######################### public methods #########################

    /**
     * Activates this package transformation
     * @param activePackages Array of packages that are being activated
     */
    public activate(activePackages: AnglrPackages[]): void
    {
    }
}