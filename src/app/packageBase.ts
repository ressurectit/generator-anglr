import {Project, ImportDeclaration} from "ts-morph";
import * as chalk from 'chalk';
import * as path from 'path';

import {AnglrPackagesInternal, AnglrFeatures} from './interfaces/types';
import {AnglrBase} from './anglrBase';

/**
 * Base class for package installation
 */
export abstract class PackageBase extends AnglrBase
{
    //######################### public methods #########################

    /**
     * Runs code that enable this
     */
    public enable(): void
    {
        console.log(chalk.whiteBright(`Enabling package '${this._name}'`));

        this._enabled = true;
    }

    /**
     * Runs code that disable this
     */
    public disable(): void
    {
        console.log(chalk.whiteBright(`Disabling package '${this._name}'`));

        this._removePackageJsonDependency(this._name);
        this._removeWebpackDevImport(this._name);
    }

    //######################### protected methods #########################

    /**
     * Removes webpack.config.dev.imports.js import statement for dependency
     * @param dependency Name of dependency that is going to be removed
     */
    protected _removeWebpackDevImport(dependency: AnglrPackagesInternal|AnglrFeatures): void
    {
        this._removeImport(dependency, 'webpack.config.dev.imports.js');
    }

    /**
     * Removes dependencies.browser.ts import statement for dependency
     * @param dependency Name of dependency that is going to be removed
     */
    protected _removeDependenciesBrowserImport(dependency: AnglrPackagesInternal|AnglrFeatures): void
    {
        this._removeImport(dependency, path.join('app', 'dependencies.browser.ts'));
    }

    /**
     * Removes dependencies.ts import statement for dependency
     * @param dependency Name of dependency that is going to be removed
     */
    protected _removeDependenciesImport(dependency: AnglrPackagesInternal|AnglrFeatures): void
    {
        this._removeImport(dependency, path.join('app', 'dependencies.ts'));
    }

    /**
     * Removes import statement for dependency
     * @param dependency Name of dependency that is going to be removed
     * @param file Path to file from which will be dependency removed
     */
    protected _removeImport(dependency: AnglrPackagesInternal|AnglrFeatures, file: string): void
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