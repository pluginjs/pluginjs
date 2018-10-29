import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const external = pkg.dependencies ? Object.keys(pkg.dependencies) : []
const globals = Object.assign(
  {},
  pkg.globals,
  external.reduce((r, i) => Object.assign(r, { [i]: i }), {})
)
const babelCallback = (options = {}) => {
  const presetEnvOptions = Object.assign(
    { modules: false },
    options.esmodules ? { targets: { esmodules: true } } : {}
  )
  return babel({
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', presetEnvOptions]],
    babelrc: false,
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties'
    ]
  })
}

export default [
  {
    input: 'src/main.js',
    external,
    output: {
      name: pkg.name,
      file: pkg.main,
      format: 'umd',
      globals
    },
    plugins: [babelCallback(), commonjs()]
  },
  {
    input: 'src/main.js',
    external,
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [babelCallback({ esmodules: true }), commonjs()]
  }
]
