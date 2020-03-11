import {CommandLineOptions} from "../../shared.interfaces";

/**
 * Options for page component command line
 */
export interface PageOptions extends CommandLineOptions
{
    /**
     * Path to root routes file, contains 'pages' that are part of top level routes
     */
    rootRoutesFile?: string;

    /**
     * Path to routes file, contains 'pages' that are part of specified module routes
     */
    routesFile?: string;
}