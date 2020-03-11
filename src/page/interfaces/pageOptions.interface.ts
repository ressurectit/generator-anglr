import {CommandLineOptions} from "../../shared.interfaces";

/**
 * Options for page component command line
 */
export interface PageOptions extends CommandLineOptions
{
    /**
     * Path to root routes file, contains 'pages' that are part of top level routes
     */
    rootRoutesFile: string;

    /**
     * Name of routes file, contains 'pages' that are part of specified module routes, can use '{{moduleName}}' for replacement
     */
    routesFile: string;

    /**
     * Name of constant storing array of pages for router module
     */
    componentsArrayName: string;

    /**
     * Path to directory containing pages
     */
    pagesPath: string;
}