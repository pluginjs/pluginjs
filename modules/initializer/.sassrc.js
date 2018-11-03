const pkg = require('./package.json')
const path = require('path')
const rename = require('rename')

module.exports = {
  includePaths: [path.join(__dirname, '../../node_modules'), 'node_modules']
}
