import Pj from '@pluginjs/factory'

export default function globalRegister(name) {
  return function(plugin) {
    Pj[name] = plugin
  }
}
