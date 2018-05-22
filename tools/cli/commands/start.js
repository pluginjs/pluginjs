const Bundler = require('parcel-bundler')

function start(ctx) {
  process.env.NODE_ENV = 'development'
  const bundler = new Bundler('./index.html', {
    cache: false,
    logLevel: 3
  })
  bundler.bundle()
}

module.exports = start
