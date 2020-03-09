import * as Generator from 'yeoman-generator';
import * as superagent from 'superagent';
import * as extract from 'extract-zip';
import * as chalk from 'chalk';
import * as path from 'path';
import {nameof} from '@jscrpt/common';

import {GatheredData, PackageJson} from './interfaces';

const SCAFFOLD_ZIP = 'scaffold.zip';

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
                message: 'Name of project',
                default: process.cwd().split(path.sep).pop()
            },
            {
                type: 'input',
                name: nameof<GatheredData>('author'),
                message: 'Author name',
                default: `${this.user.git.name()} <${this.user.git.email()}>`
            }
        ]);
    }

    /**
     * Writes files to disk
     */
    public async writing()
    {
        let result = await superagent.get('https://github.com/kukjevov/ng-universal-demo/archive/1.0.zip');
        
        this.fs.write(this.destinationPath(SCAFFOLD_ZIP), result.body);
        
        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

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

        this.fs.move(this.destinationPath('ng-universal-demo-1.0/.*'), this.destinationRoot('.'));
        this.fs.move(this.destinationPath('ng-universal-demo-1.0'), this.destinationPath('.'));
        this.fs.delete(this.destinationPath(SCAFFOLD_ZIP));
        this.fs.delete(this.destinationPath('ng-universal-demo-1.0'));

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });

        let packageJson: PackageJson = this.fs.readJSON(this.destinationPath('package.json'));

        packageJson.author = this.gatheredData.author;
        packageJson.name = this.gatheredData.projectName;

        this.fs.writeJSON(this.destinationPath('package.json'), packageJson);

        await new Promise(resolve =>
        {
            this.fs.commit(() => resolve());
        });
    }

    /**
     * Installs NPM dependencies
     */
    public install()
    {
        this.log("Installing dependencies");

        this.npmInstall([], {}, () =>
        {
            this.log("Application is installed.");
        });
    }

    /**
     * End of generating of app
     */
    public end()
    {
        this.log(`App '${this.gatheredData.projectName}' was generated.`);
        this.log("To start application and development process, write 'npm start'");
        this.log("Then your application will be running on 'http://localhost:8888'");
    }
}