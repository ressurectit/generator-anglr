import {PackageBase} from '../packageBase';
import {AnglrPackages} from '../interfaces/types';

/**
 * Represents package modifications for angular2-hotkeys
 */
export class Angular2HotkeysPackage extends PackageBase
{
    //######################### public properties #########################

    /**
     * Array of packages that is this package dependend on
     */
    public static get dependsOnPackages(): AnglrPackages[]
    {
        return ['angular2-hotkeys'];
    }

    /**
     * Array of packages that should be deleted when this one is not used
     */
    public static get cascadeDelete(): AnglrPackages[]
    {
        return ['@anglr/common/hotkeys'];
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