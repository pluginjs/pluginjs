#!/usr/bin/env node
const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
const logger = require('@pluginjs/helper/logger')('cli/index')
const utils = require('./scripts/utils')

const scriptProcesser = (name, options) => {
  const scriptsList = fs
    .readdirSync(path.join(__dirname, './scripts'))
    .map(file => file.split('.')[0])
  if (!scriptsList.includes(name)) {
    logger.log(`named '${name}' script is not exists.`)
    return false
  }
  const script = require(`./scripts/${name}`)
  return script(Object.assign(options, utils))
}
const alias = (key, alias) => ({
  ...alias,
  handler: argv => scriptProcesser(key, argv)
})

yargs
  .command({
    command: ['script [scriptName]', 'exec'],
    desc: 'exec script from script repositories',
    bundler: yargs => {
      return yargs.positional('scriptName', {
        desc: 'Script name',
        mode: 'string',
        default: 'ls'
      })
    },
    handler: argv => scriptProcesser(argv.scriptName, argv)
  })
  .command(
    alias('start', {
      command: ['run [moduleName]', 'start', '$0'],
      desc: 'Start a dev server.'
    })
  )
  .command(
    alias('build', {
      command: ['build [moduleName]', 'b'],
      desc: 'Build a bundle.'
    })
  )
  .command(
    alias('publish', {
      command: 'publish [moduleName]',
      desc: 'Publish module to npm.'
    })
  )
  .command(
    alias('test', {
      command: ['test [moduleName]', 't'],
      desc: 'Test module by jest.'
    })
  )
  .command(
    alias('new', {
      command: ['new [moduleName]', 'n'],
      desc: 'Create a new plugin.'
    })
  )
  .command(
    alias('samples-generate', {
      command: ['samples [moduleName]', 's'],
      desc: 'generate samples.'
    })
  )
  .command(
    alias('publish', {
      command: ['publish [moduleName...]'],
      desc: 'Publish package to npm'
    })
  )
  .command(
    alias('lint', {
      command: ['lint [moduleName]'],
      desc: 'Lint JavaScript code by ESLint.'
    })
  )
  .command(
    alias('samples-generate', {
      command: ['create-samples [moduleName]'],
      desc: 'Make creating samples easily.'
    })
  )
  .parse()
