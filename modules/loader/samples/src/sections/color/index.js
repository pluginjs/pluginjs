import { queryAll } from '@pluginjs/dom'
import Loader from '@pluginjs/loader'

const elements = queryAll('#color .loader')

elements.map(element => Loader.of(element))
