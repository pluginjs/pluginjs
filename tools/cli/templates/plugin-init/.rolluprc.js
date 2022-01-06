import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser"
import rename from 'rename'
import pkg from './package.json'

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
    external,
    output: {
      name: pkg.name,
      file: pkg.umd,
      format: 'umd',
      exports: 'auto',
      globals,
      interop: false
    },
    plugins: [babelCallback(), commonjs()]
  },
  {
    input: pkg.source,
    external,
    output: [
      { file: pkg.main, format: 'cjs', interop: false, exports: 'auto' },
      { file: pkg.module, format: 'es', interop: false, exports: 'auto' }
    ],
    plugins: [babelCallback({ esmodules: true }), commonjs()]
  },
  {
    input: pkg.source,
    external,
    output: {
      name: pkg.name,
      file: rename(pkg.umd, {suffix: '.min'}),
      format: 'umd',
      exports: 'auto',
      globals,
      interop: false
    },
    plugins: [babelCallback(), commonjs(), terser()]
  },
  {
    input: pkg.source,
    external,
    output: [
      { file: rename(pkg.main, {suffix: '.min'}), format: 'cjs', interop: false, exports: 'auto' },
      { file: rename(pkg.module, {suffix: '.min'}), format: 'es', interop: false, exports: 'auto' }
    ],
    plugins: [babelCallback({ esmodules: true }), commonjs(), terser()]
  }
]
