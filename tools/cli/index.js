#!/usr/bin/env node
const yargs = require('yargs')
const logger = require('@pluginjs/helper/logger')('cli/index')
const run = require('./commands/run')
const start = require('./commands/start')

const argv = yargs
  .command(
    'run [moduleName]',
    'run module',
    yargs => {
      yargs.positional('moduleName', {
        describe: 'module name',
        default: 'all'
      })
    },
    argv => run(argv)
  )
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .command({
    command: 'start',
    desc: 'start with pluginjs cli',
    handler: argv => start(argv)
  }).argv

// logger.log(argv)
