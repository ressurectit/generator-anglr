import * as Generator from 'yeoman-generator';
import * as Handlebars from 'handlebars';
import {readdirSync} from 'fs';

import {AvailableNames} from "./shared.interfaces";

Handlebars.registerHelper('ifEquals', function(this: any, arg1, arg2, options)
{
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

/**
 * Creates all available names from name
 * @param name Name to be changed to available names
 */
export function prepareNames(name: string): AvailableNames
{
    return {
        name: name,
        normalizedName: name.replace(/[A-Z]/g, (str => `-${str.toLowerCase()}`)),
        capitalizedName: name[0].toUpperCase() + name.substr(1)
    };
}

/**
 * Copy template and replace handlebars from context
 * @param generator Generator instance
 * @param templatePath Path to template
 * @param destinationPath Destination path
 * @param context Object context that is used for template replacement
 */
export function copyTpl(generator: Generator, templatePath: string, destinationPath: string, context: any)
{
    let template = Handlebars.compile(generator.fs.read(generator.templatePath(templatePath)));

    generator.fs.write(generator.destinationPath(destinationPath), template(context));
}

/**
 * Gets array of all directories at specified path
 * @param source Source path to be probed for sub directories
 */
export function getDirectories(source: string): string[]
{
    return readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

/**
 * Adds items from source to target array if they do not already exists
 * @param target Target array which will be extended with new values
 * @param source Source array which contains new items that will be added
 */
export function addDistinct<TData>(target: TData[], source: TData[]): void
{
    source.forEach(itm =>
    {
        if(target.indexOf(itm) >= 0)
        {
            return;
        }

        target.push(itm);
    });
}

/**
 * Gets supplement for current items from all possible items
 * @param all Array containing all possible items
 * @param arr Array containing current items
 */
export function getArraySupplement<TData>(all: TData[], arr: TData[]): TData[]
{
    let result: TData[] = [];

    all.forEach(itm =>
    {
        if(arr.indexOf(itm) < 0)
        {
            result.push(itm);
        }
    });

    return result;
}