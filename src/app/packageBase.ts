import {AnglrPackages} from './interfaces/types';

/**
 * Interface for package type definition
 */
export interface PackageType
{
    /**
     * Array of packages that is this package dependend on
     */
    readonly dependsOnPackages: AnglrPackages[];
}

/**
 * Base class for package installation
 */
export abstract class PackageBase
{
    //######################### public methods #########################

    /**
     * Activates this package transformation
     * @param activePackages Array of packages that are being activated
     */
    public abstract activate(activePackages: AnglrPackages[]): void;
}