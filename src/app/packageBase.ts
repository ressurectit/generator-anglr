import {Project, ImportDeclaration} from "ts-morph";
import * as Generator from 'yeoman-generator';
import * as chalk from 'chalk';
import * as path from 'path';

import {AnglrPackages, AnglrPackagesInternal} from './interfaces/types';
import {PackageJson} from './interfaces';

/**
 * Interface for package type definition
 */
export interface PackageType
{
    /**
     * Array of packages that is this package dependend on
     */
    readonly dependsOnPackages: AnglrPackages[];

    /**
     * Array of packages that should be deleted when this one is not used
     */
    readonly cascadeDelete: AnglrPackages[];

    new(_name: AnglrPackages, _generator: Generator): PackageBase;
}

/**
 * Base class for package installation
 */
export abstract class PackageBase
{
    //######################### constructor #########################
    constructor(protected _name: AnglrPackages,
                protected _generator: Generator)
    {
    }

    //######################### public methods #########################

    /**
     * Activates this package transformation
     */
    public activate(): void
    {
        console.log(chalk.blueBright(`Removing package '${this._name}'`));

        this._removePackageJsonDependency(this._name);
        this._removeWebpackDevImport(this._name);
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
    protected _removePackageJsonDependency(dependency: AnglrPackages): void
    {
        let packageJson = this._readPackageJson();

        delete packageJson.dependencies[dependency];

        this._setPackageJson(packageJson);
    }

    /**
     * Removes webpack.config.dev.imports.js import statement for dependency
     * @param dependency Name of dependency that is going to be removed
     */
    protected _removeWebpackDevImport(dependency: AnglrPackagesInternal): void
    {
        this._removeImport(dependency, 'webpack.config.dev.imports.js');
    }

    /**
     * Removes dependencies.browser.ts import statement for dependency
     * @param dependency Name of dependency that is going to be removed
     */
    protected _removeDependenciesBrowserImport(dependency: AnglrPackagesInternal): void
    {
        this._removeImport(dependency, path.join('app', 'dependencies.browser.ts'));
    
    }
    /**
     * Removes dependencies.ts import statement for dependency
     * @param dependency Name of dependency that is going to be removed
     */
    protected _removeDependenciesImport(dependency: AnglrPackagesInternal): void
    {
        this._removeImport(dependency, path.join('app', 'dependencies.ts'));
    }

    /**
     * Removes import statement for dependency
     * @param dependency Name of dependency that is going to be removed
     * @param file Path to file from which will be dependency removed
     */
    protected _removeImport(dependency: AnglrPackagesInternal, file: string): void
    {
        const project = new Project();

        let webpackDevImportsPath = this._generator.destinationPath(file);

        if(!this._generator.fs.exists(webpackDevImportsPath))
        {
            return;
        }

        project.addSourceFileAtPath(webpackDevImportsPath);
        let source = project.getSourceFile(file);

        let importsForRemoval: ImportDeclaration[] = [];

        source?.getImportDeclarations().forEach($import =>
        {
            if(new RegExp(`^("|')${dependency}("|')$`).test($import.getModuleSpecifier().getText()))
            {
                importsForRemoval.push($import);
            }
        });

        importsForRemoval.forEach($import => $import.remove());

        source?.saveSync();
    }
}