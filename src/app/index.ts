import * as Generator from 'yeoman-generator';
import * as superagent from 'superagent';
import * as extract from 'extract-zip';
import * as chalk from 'chalk';
import * as fs from 'fs';
import {nameof} from '@jscrpt/common';

import {GatheredData, PackageJson} from './interfaces';
import {packages} from './packages';
import {addDistinct, getArraySupplement, prepareNames} from '../utils';
import {AnglrPackages, AnglrFeatures} from './interfaces/types';
import {features} from './features';
import {AnglrBase, AnglrType} from './anglrBase';

const SCAFFOLD_ZIP = 'scaffold.zip';
const SCAFFOLD_SOURCE_URL = 'https://github.com/kukjevov/ng-universal-demo/archive/1.0.zip';
const ALL_FEATURES: AnglrFeatures[] =
[
    'Git Version',
    'ES2015'
];

const ALL_PACKAGES: AnglrPackages[] =
[
    '@angular/material',
    '@angular/cdk',
    '@anglr/animations',
    '@anglr/authentication',
    '@anglr/bootstrap',
    '@anglr/common',
    '@anglr/error-handling',
    '@anglr/grid',
    '@anglr/md-help',
    '@anglr/notifications',
    '@anglr/rest',
    '@anglr/select',
    '@jscrpt/common',
    '@fortawesome/fontawesome-free',
    'moment',
    'eonasdan-bootstrap-datetimepicker',
    'typeahead.js',
    'numeral',
    'file-saver',
    'd3',
    'store',
    'konami'
];

/**
 * Anglr project scaffolding generator
 */
module.exports = class AnglrGenerator extends Generator
{
    //######################### private fields #########################

    /**
     * Gathered data from user
     */
    private _gatheredData!: GatheredData;

    //######################### public properties #########################

    /**
     * Gets gathered data from user
     */
    public get gatheredData(): GatheredData
    {
        return this._gatheredData;
    }
    
    //######################### constructor #########################

    // The name `constructor` is important here
    constructor(args: string | string[], opts: {}) 
    {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
    }

    //######################### public methods - phases #########################
    
    /**
     * Prompts user for configuration
     */
    public async prompting(): Promise<void>
    {
        this._gatheredData = await this.prompt(
        [
            {
                type: 'input',
                name: nameof<GatheredData>('projectName'),
                message: 'Name of project'
            },
            {
                type: 'input',
                name: nameof<GatheredData>('author'),
                message: 'Author name',
                default: `${this.user.git.name()} <${this.user.git.email()}>`
            },
            {
                type: 'checkbox',
                name: nameof<GatheredData>('features'),
                message: 'Anglr features',
                default: ALL_FEATURES,
                choices: ALL_FEATURES
            },
            {
                type: 'checkbox',
                name: nameof<GatheredData>('packages'),
                message: 'Anglr packages',
                default: ALL_PACKAGES,
                choices: ALL_PACKAGES
            }
        ]);
    }

    /**
     * Writes files to disk
     */
    public async writing()
    {
        let projectNames = prepareNames(this._gatheredData.projectName);

        //create new folder and set destination root
        if(fs.existsSync(this.destinationPath(projectNames.name)))
        {
            console.log(chalk.red(`Directory '${projectNames.name}' already exists!`));

            process.exit(-1);
        }

        fs.mkdirSync(projectNames.name);
        this.destinationRoot(projectNames.name);

        //download latest universal demo
        let result = await superagent.get(SCAFFOLD_SOURCE_URL);
        
        this.fs.write(this.destinationPath(SCAFFOLD_ZIP), result.body);

        this.log(chalk.green(`'${SCAFFOLD_ZIP}' was successfuly obtained from '${SCAFFOLD_SOURCE_URL}'`));
        
        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        //unzip latest universal demo
        await new Promise(resolve =>
        {
            extract(this.destinationPath(SCAFFOLD_ZIP),
                    {
                        dir: this.destinationPath('.')
                    },
                    (err) =>
                    {
                        if(err)
                        {
                            console.log(chalk.red(err));

                            process.exit(-1);
                        }

                        resolve();
                    });    
        });

        //move to local directory and cleanup
        this.fs.move(this.destinationPath('ng-universal-demo-1.0/.*'), this.destinationRoot('.'));
        this.fs.move(this.destinationPath('ng-universal-demo-1.0'), this.destinationPath('.'));
        this.fs.delete(this.destinationPath(SCAFFOLD_ZIP));
        this.fs.delete(this.destinationPath('ng-universal-demo-1.0'));

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        //update package json
        let packageJson: PackageJson = this.fs.readJSON(this.destinationPath('package.json'));

        packageJson.author = this.gatheredData.author;
        packageJson.name = projectNames.normalizedName;

        this.fs.writeJSON(this.destinationPath('package.json'), packageJson);

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        //activate features transformation
        let ftrs = this._getFlaggedArray(this._gatheredData.features, getArraySupplement(ALL_FEATURES, this._gatheredData.features), this, features);
        ftrs.forEach(feature => feature.enabled ? feature.instance.enable() : feature.instance.disable());

        //activate packages transformation
        let {enabled, disabled} = this._getEnabledDisabledPackages(this._gatheredData.packages, this._gatheredData.features);        

        let pckgs = this._getFlaggedArray(enabled, disabled, this, packages);
        pckgs.forEach(pckg => pckg.enabled ? pckg.instance.enable() : pckg.instance.disable());

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        //runs post processing
        ftrs.forEach(feature => feature.instance.postprocess());
    }

    /**
     * Installs NPM dependencies
     */
    public install()
    {
        this.log("Installing dependencies");

        this.npmInstall([], {});
    }

    /**
     * End of generating of app
     */
    public end()
    {
        this.log(chalk.green(`App '${this.gatheredData.projectName}' was generated.`));
        this.log(chalk.whiteBright("To start application and development process, write 'npm start'"));
        this.log(chalk.whiteBright("Then your application will be running on 'http://localhost:8888'"));
    }

    //######################### private methods #########################

    /**
     * Gets computed final version of enabled and disabled packages
     * @param selectedPackages Array of selected packages
     * @param selectedFeatures Array of selected features
     */
    private _getEnabledDisabledPackages(selectedPackages: AnglrPackages[], selectedFeatures: AnglrFeatures[]): {enabled: AnglrPackages[], disabled: AnglrPackages[]}
    {
        console.log(selectedFeatures);

        let tmp = [...selectedPackages];
        tmp.forEach(packageName => addDistinct(selectedPackages, packages[packageName].dependsOnPackages));

        let disabled = getArraySupplement(ALL_PACKAGES, selectedPackages);
        tmp = [...disabled];
        tmp.forEach(packageName => addDistinct(disabled, packages[packageName].cascadeDelete));

        return {
            disabled,
            enabled: selectedPackages
        };
    }

    /**
    * Gets array of instances of anglr transformators
    * @param enabled Array containing selected items
    * @param disabled Array containing unselected items
    * @param generator Instance of generator
    * @param anglrTypes Dictionary of anglr types
    */
    private _getFlaggedArray<TData extends AnglrFeatures|AnglrPackages>(enabled: TData[], disabled: TData[], generator: Generator, anglrTypes: {[name: string]: AnglrType}): {enabled: boolean, instance: AnglrBase}[]
    {
        return [
            ...enabled.map(itm =>
            {
                return {
                    enabled: true,
                    instance: new anglrTypes[itm](itm, generator)
                };
            }),
            ...disabled.map(itm =>
            {
                return {
                    enabled: false,
                    instance: new anglrTypes[itm](itm, generator)
                };
            })
        ];
    }
}