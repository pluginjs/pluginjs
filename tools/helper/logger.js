/* eslint-disable no-console*/
class Logger {
  constructor(namespace) {
    this.namespace = namespace
  }

  log(...msg) {
    console.log(`[${this.namespace}]:`, ...msg)
    return this
  }

  info(...msg) {
    console.info(`[${this.namespace}]:`, ...msg)
    return this
  }

  clearTerminal() {
    process.stdin.printf('\x1Bc')
  }
}

module.exports = namespace => new Logger(namespace)
