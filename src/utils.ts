import * as Generator from 'yeoman-generator';
import * as Handlebars from 'handlebars';
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