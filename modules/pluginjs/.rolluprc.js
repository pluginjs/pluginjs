import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser"
import rename from 'rename'
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'

const external = pkg.dependencies ? Object.keys(pkg.dependencies) : []
const globals = Object.assign(
  {},
  external.reduce((r, i) => Object.assign(r, { [i]: i }), {}),
  pkg.globals
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
    babelHelpers: 'bundled',
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties'
    ]
  })
}

export default [
  {
    input: pkg.source,
    //external,
    output: {
      name: pkg.name,
      file: pkg.umd,
      format: 'umd',
      globals,
      interop: false
    },
    plugins: [babelCallback(), commonjs(), resolve()]
  },
  {
    input: pkg.source,
    //external,
    output: [
      { file: pkg.main, format: 'cjs', interop: false },
      { file: pkg.module, format: 'es', interop: false }
    ],
    plugins: [babelCallback({ esmodules: true }), commonjs(), resolve()]
  }
]
