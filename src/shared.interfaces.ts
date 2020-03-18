import {Answers, Question} from 'yeoman-generator';
import * as inquirer from 'inquirer';

/**
 * Available Angular build block types to be created
 */
export type AngularBuildBlockType = 'component'|'directive'|'pipe';

/**
 * Gathered data from user
 */
export interface BuildBlockGatheredData
{
    /**
     * Name of build block that is going to be created
     */
    name: string;

    /**
     * Path where to create new build block
     */
    path: string;
}

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

export type PathQuestion<T extends Answers = Answers> = inquirer.DistinctQuestion<T> & Question<T> &
{
    /**
     * If true, will only show directory. Default: false.
     */
    onlyShowDir?: boolean;

    /**
     * It is the root of file tree. Default: process.cwd().
     */
    root?: string;
};