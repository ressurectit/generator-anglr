import {SourceFile, Project} from 'ts-morph';
import * as chalk from 'chalk';
import * as Generator from 'yeoman-generator';

import {AnglrPackages, AnglrFeatures, AnglrPackagesInternal} from './interfaces/types';
import {PackageJson} from './interfaces';
import {Dictionary} from '@jscrpt/common';

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
        this._removePackageJsonDep(dependency, 'dependencies');
    }

    /**
     * Removes package.json dev dependency
     * @param dependency Name of dev dependency that is going to be removed
     */
    protected _removePackageJsonDevDependency(dependency: AnglrPackagesInternal|AnglrFeatures): void
    {
        this._removePackageJsonDep(dependency, 'devDependencies');
    }

    /**
     * Removes package.json dependency or dev dependency or peer dependency
     * @param dependency Name of dependency that is going to be removed
     * @param type Name of dependency type
     */
    protected _removePackageJsonDep(dependency: AnglrPackagesInternal|AnglrFeatures, type: keyof PackageJson): void
    {
        let packageJson = this._readPackageJson() as Dictionary;

        delete packageJson[type][dependency];

        this._setPackageJson(packageJson as PackageJson);
    }

    /**
     * Gets source file for provided file path
     * @param filePath Path to file for which will be source file obtained
     */
    protected _getSourceFile(filePath: string): SourceFile|null
    {
        const project = new Project();

        let path = this._generator.destinationPath(filePath);

        if(!this._generator.fs.exists(path))
        {
            console.log(chalk.yellow(`File '${filePath}' was not found!`));

            return null;
        }

        project.addSourceFileAtPath(path);

        return project.getSourceFile(filePath)!;
    }
}