/**
 * All possible used names
 */
export interface AvailableNames
{
    /**
     * Original name
     */
    name: string;

    /**
     * Normalized name, all uppercase letters changed to lowercase, also word separator is hyphen
     */
    normalizedName: string;

    /**
     * Original name with first letter to uppercase
     */
    capitalizedName: string;
}

/**
 * Command line options
 */
export interface CommandLineOptions
{
    /**
     * Indication that help is required
     */
    help?: boolean;
}