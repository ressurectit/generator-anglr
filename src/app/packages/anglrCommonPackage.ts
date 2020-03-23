import {PackageBase} from '../packageBase';
import {AnglrPackages} from '../interfaces/types';

/**
 * Represents package modifications for anglr common
 */
export class AnglrCommonPackage extends PackageBase
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
        return ['@anglr/common/forms', '@anglr/common/hmr', '@anglr/common/hotkeys', '@anglr/common/material', '@anglr/common/moment', '@anglr/common/numeral', '@anglr/common/positions', '@anglr/common/router', '@anglr/common/store', '@anglr/common/structured-log'];
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