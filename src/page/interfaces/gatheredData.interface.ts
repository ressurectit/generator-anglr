/**
 * Gathered data from user
 */
export interface GatheredData
{
    /**
     * Name of page that is going to be created
     */
    pageName: string;

    /**
     * Route path for new page
     */
    route: string;

    /**
     * Name of permission required for displaying page
     */
    permission: string;

    /**
     * Name of module which will include this page component
     */
    module: string;
}