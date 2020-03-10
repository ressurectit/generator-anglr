/**
 * Available types to be create inside of new module
 */
export type AngularModuleContentsType = 'component'|'directive'|'pipe';

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
    type: AngularModuleContentsType;
}