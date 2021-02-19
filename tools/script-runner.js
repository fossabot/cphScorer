#!/usr/bin/env node

/**
 * Helper to run script in updated modules
 * @param 1: script to run - default 'test'
 * @param 2: git ref to inspect - default HEAD
 * @example
 *   script-runner format develop -> run format script on modules updated in last commit on develop
 * @example
 *    script-runner -> with default value : run test on modules updated in current HEAD
 */

const chalk = require('chalk')
const ora = require('ora')
const { exec } = require('child_process')
const { join } = require('path')

/** to return correct error code */
let processResult = 0

/**
 * Shell helper
 * @param {string} cmd bash command
 * @returns {Promise<string>} result of command
 */
function shell(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(stderr)
            } else {
                resolve(stdout)
            }
        })
    })
}

/**
 * Find modules updated. Base on file updated in last commit on ref
 * @param {string} ref git ref
 * @returns {string} modules with `,` separator
 */
async function getModule(ref) {
    try {
        return await shell(`git show --pretty='' --name-only ${ref} | grep -e '^packages/.*/.*' | cut -d '/' -f2 | uniq | tr '\n' ','`)
    } catch (e) {
        console.error(chalk.red.bold('Error occured : '))
        console.error(e)
        process.exit(1)
    }
}

/**
 * Lerna wrapper to run npm script in module
 * @param {string} script script to run on module
 * @param {string} module
 */
async function runScript(script, module) {
    const root = require(join(process.cwd(), './package.json')).name
    const spinner = ora(`Run ${script} on @${root}/${module}`).start()
    try {
        const res = await shell(`./node_modules/.bin/lerna run --scope @${root}/${module} ${script}`)
        spinner.succeed()
        console.log('\n')
    } catch (e) {
        spinner.fail()
        console.log('\n')
        console.error(chalk.red.bold(e))
        processResult = 1
    }

}

/** script bootstrap */
async function run() {
    const [script = 'test', ref = 'HEAD'] = process.argv.slice(2)

    const modules = (await getModule(ref))
        .split(',')
        .filter(x => x.length > 0)

    ora(`module changed : ${JSON.stringify(modules)} \n`).info()

    await modules.reduce(async (memo, m) => {
        await memo
        await runScript(script, m)
    }, Promise.resolve())

    console.log(chalk.hex('#000').bold(chalk[
        processResult ? 'bgRed' : 'bgGreen'
    ](
        processResult ? ` ${script} failed ` : ` ${script} success `, '\n'
    )))

    process.exit(processResult)
}

run()