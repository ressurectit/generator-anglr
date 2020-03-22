import {PackageBase} from '../packageBase';
import {AnglrPackages} from '../interfaces/types';

/**
 * Represents package modifications for anglr common hmr
 */
export class AnglrCommonHmrPackage extends PackageBase
{
    //######################### public properties #########################

    /**
     * Array of packages that is this package dependend on
     */
    public static get dependsOnPackages(): AnglrPackages[]
    {
        return ['@jscrpt/common'];
    }

    /**
     * Array of packages that should be deleted when this one is not used
     */
    public static get cascadeDelete(): AnglrPackages[]
    {
        return [];
    }

    //######################### public methods #########################

    /**
     * Activates this package transformation
     */
    public activate(): void
    {
        super.activate();
    }
}