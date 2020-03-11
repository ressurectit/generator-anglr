import {CommandLineOptions} from "../../shared.interfaces";

/**
 * Options for lazy route module command line
 */
export interface LazyRouteModuleOptions extends CommandLineOptions
{
    /**
     * Path to root routes file, contains 'pages' that are part of top level routes
     */
    rootRoutesFile: string;

    /**
     * Name of constant storing root routes module options
     */
    rootRoutesOptionsConst: string;

    /**
     * Path to directory containing pages
     */
    pagesPath: string;
}