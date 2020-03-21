import {AnglrPackages, AnglrFeatures} from './types';

/**
 * Gathered data from user
 */
export interface GatheredData
{
    /**
     * Name of project
     */
    projectName: string;

    /**
     * Author name
     */
    author: string;

    /**
     * Array of enabled features
     */
    features: AnglrFeatures[];

    /**
     * Array of enabled packages
     */
    packages: AnglrPackages[];
}