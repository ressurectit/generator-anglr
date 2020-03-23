import * as Generator from 'yeoman-generator';

import {AnglrPackages, AnglrFeatures, AnglrPackagesInternal} from './interfaces/types';
import {PackageJson} from './interfaces';

/**
 * Interface for anglr type definition
 */
export interface AnglrType
{
    /**
     * Array of packages that is this dependend on
     */
    readonly dependsOnPackages: AnglrPackages[];

    /**
     * Array of packages that should be deleted when this one is not used
     */
    readonly cascadeDelete: AnglrPackages[];

    new(name: AnglrPackages|AnglrFeatures, generator: Generator): AnglrBase;
}

/**
 * Base class for anglr type
 */
export abstract class AnglrBase
{
    //######################### protected fields #########################

    /**
     * Indication whether was this enabled or disabled
     */
    protected _enabled: boolean = false;

    //######################### constructor #########################
    constructor(protected _name: AnglrPackages|AnglrFeatures,
                protected _generator: Generator)
    {
    }

    //######################### public methods #########################

    /**
     * Runs code that enable this
     */
    public abstract enable(): void;

    /**
     * Runs code that disable this
     */
    public abstract disable(): void;

    /**
     * Runs postprocessing for this, it is called after all files have been written
     */
    public postprocess(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Reads package.json
     */
    protected _readPackageJson(): PackageJson
    {
        return this._generator.fs.readJSON(this._generator.destinationPath('package.json'));
    }

    /**
     * Writes package.json new content
     * @param packageJson Package json content to be written
     */
    protected _setPackageJson(packageJson: PackageJson): void
    {
        this._generator.fs.writeJSON(this._generator.destinationPath('package.json'), packageJson);
    }

    /**
     * Removes package.json dependency
     * @param dependency Name of dependency that is going to be removed
     */
    protected _removePackageJsonDependency(dependency: AnglrPackagesInternal|AnglrFeatures): void
    {
        let packageJson = this._readPackageJson();

        delete packageJson.dependencies[dependency];

        this._setPackageJson(packageJson);
    }
}