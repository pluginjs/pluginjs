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
        desc: 'script name',
        type: 'string',
        default: 'ls'
      })
    },
    handler: argv => scriptProcesser(argv.scriptName, argv)
  })
  .command(
    alias('start', {
      command: ['run [moduleName]', 'start', '$0'],
      desc: 'start a dev server.'
    })
  )
  .command(
    alias('build', {
      command: ['build [moduleName]', 'b'],
      desc: 'build a bundle.'
    })
  )
  .command(
    alias('publish', {
      command: 'publish [moduleName]',
      desc: 'publish module to npm.'
    })
  )
  .parse()
