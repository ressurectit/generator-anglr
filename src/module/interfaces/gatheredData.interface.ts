import {AngularBuildBlockType} from '../../shared.interfaces';

/**
 * Gathered data from user
 */
export interface GatheredData
{
    /**
     * Name of new module
     */
    moduleName: string;

    /**
     * Type of item to be created for module
     */
    type: AngularBuildBlockType;
}