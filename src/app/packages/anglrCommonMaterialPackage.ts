import {PackageBase} from '../packageBase';
import {AnglrPackages} from '../interfaces/types';

/**
 * Represents package modifications for anglr common material
 */
export class AnglrCommonMaterialPackage extends PackageBase
{
    //######################### public properties #########################

    /**
     * Array of packages that is this package dependend on
     */
    public static get dependsOnPackages(): AnglrPackages[]
    {
        return ['@angular/material', '@angular/cdk', '@anglr/common'];
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
     * Runs code that enable this
     */
    public enable(): void
    {
        super.enable();
    }
}