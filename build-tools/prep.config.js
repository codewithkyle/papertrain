const rimraf = require("rimraf");
const fs = require('fs');
const chalk = require('chalk');

class AutomationManager
{
    constructor()
    {
        this.run();
    }

    async run()
    {
        try
        {
            await this.removeStaleCompiledFiles();
            await this.removeIEFiles();
            await this.generateNewCachebust();
        }
        catch (error)
        {
            console.log(chalk.hex('#ff6426').bold(error));
        }
    }

    removeIEFiles()
    {
        return new Promise((resolve, reject)=>{
            fs.promises.access('_ie')
            .then(()=>{
                rimraf('_ie', (error)=>{
                    if (error)
                    {
                        reject(error);
                    }

                    resolve();
                });
            })
            .catch(()=>{
                resolve();
            });
        });
    }

    removeStaleCompiledFiles()
    {
        return new Promise((resolve, reject)=>{
            fs.promises.access('_compiled')
            .then(()=>{
                rimraf('_compiled', (error)=>{
                    if (error)
                    {
                        reject(error);
                    }

                    resolve();
                });
            })
            .catch(()=>{
                resolve();
            });
        });
    }

    generateNewCachebust()
    {
        return new Promise((resolve, reject)=>{
            fs.copyFile(`config/papertrain/example.automation.php`, `config/papertrain/automation.tmp`, (error) => {
                if (error)
                {
                    reject(error);
                }

                fs.readFile('config/papertrain/automation.tmp', (error, buffer)=>{
                    if (error)
                    {
                        reject(error)
                    }
            
                    let data = buffer.toString();
                    const timestamp = Date.now().toString();
                    data = data.replace(/\d+/g, timestamp);
            
                    fs.writeFile('config/papertrain/automation.tmp', data, (error)=>{
                        if (error)
                        {
                            reject(error);
                        }
                    });
                });
            });
        });
    }
}

new AutomationManager();
