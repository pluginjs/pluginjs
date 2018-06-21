/* eslint-disable no-console*/
const chalk = require('chalk')
const emoji = require('./emoji')

class Logger {
  constructor(namespace) {
    this.namespace = namespace
  }

  log(...msg) {
    console.log(`[${this.namespace}]:`, ...msg)
    return this
  }

  info(...msg) {
    console.info(...msg)
    return this
  }

  title(msg, color = 'gray') {
    console.log(chalk[color](`$ ${msg}`))
    return this
  }

  success(msg, color = 'green') {
    console.log(chalk.bold[color](`${emoji.success} ${msg}`))
    return this
  }

  error(msg) {
    console.error(msg)
    return this
  }

  clear() {
    process.stdout.write('\x1Bc')
  }
}

module.exports = namespace => new Logger(namespace)
