#!/usr/bin/env node
const parse = require('minimist')
const handlebars = require('handlebars')
const chalk = require('chalk')
const fs = require('fs')
const filepath = require('path')
const { promisify } = require('util')
const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const read = async file => readFile(file, 'utf8')
const execa = require('execa')
const opn = require('opn')
const inquirer = require('inquirer')
const githubUrlFromGit = require('github-url-from-git')

const current = execa.sync('git', ['symbolic-ref', '--short', 'HEAD']).stdout
const remote = execa.sync('git', ['config', 'branch.master.remote']).stdout
const remote_url = execa.sync('git', ['remote', 'get-url', remote]).stdout

// console.log
const main = chalk.blue
const info = chalk.green
const warning = chalk.red
const plain = chalk.gray
const message = (string, type = info) => console.log(main`✨ Better PR ✨ `, type(string))

const loadTemplate = async (path = false) => {
    const { _: args = [] } = parse(process.argv.slice(2))

    const base = [
        ...args,
        // will check through this list of some project defaults
        'pull_request_template.md',
        '.github/pull_request_template.md'
    ]

    const paths = path ? [path, ...base] : base

    const file = await paths.reduce(async (check, file) => {
        const loaded = await check
        if (!loaded) {
            const exist = await exists(
                filepath.join(filepath.resolve('./'), file)
            )
            return exist ? file : false
        }
        return loaded
    }, false)

    if (!file) {
        throw new Error('need a valid template!')
    }

    return await read(file)
}

const loadPRConfig = async () => {
    const pr_config_exists = await exists(
        filepath.join(filepath.resolve('./'), '.better-pr')
    )
    if (!pr_config_exists) {
        throw new Error('.better-pr file is missing!')
    }

    return require(filepath.join(filepath.resolve('./'), '.better-pr'))
}

const smartAssigned = ({ value, match = false }) =>
    current.toLocaleLowerCase().includes(match)

;(async function() {
    try {
        const base_template = await loadTemplate()
        const { target = 'master', variables, labels } = await loadPRConfig()

        inquirer
            .prompt([
                {
                    message: 'Title of Pull Request:',
                    name: 'title'
                },
                ...variables,
                {
                    name: 'labels',
                    type: 'checkbox',
                    message: 'What labels should we assign?',
                    choices: labels.map(d => ({
                        value: d.value,
                        checked: smartAssigned(d)
                    }))
                }
            ])
            .then(answers => {
                const { title, labels } = answers
                const template = handlebars.compile(base_template)(answers)

                const pullRequestUrl = `${githubUrlFromGit(
                    remote_url
                )}/compare/${target}...${current}?expand=1&title=${title}&body=${template}&labels=${labels}`
                
                message(`Opening Pull Request`) 
                message(`${title}`, plain) 
                message(`from \`${current}\` ... to \`${target}\``, plain)

                opn(
                    pullRequestUrl,
                    { wait: false }
                )
            })
    } catch (error) {
        message(error, warning)
        process.exit(1)
    }
})()
