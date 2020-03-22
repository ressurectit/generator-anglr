import {StringDictionary} from '@jscrpt/common';

/**
 * Interface for package json properties
 */
export interface PackageJson
{
    /**
     * Name of project
     */
    name: string;

    /**
     * Description of project
     */
    description: string;

    /**
     * Author of project
     */
    author: string;

    /**
     * Array of scripts
     */
    scripts: StringDictionary;

    /**
     * Array of dependencies
     */
    dependencies: StringDictionary;

    /**
     * Array of dev dependencies
     */
    devDependencies: StringDictionary;
}