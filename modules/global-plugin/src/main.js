import Component from '@pluginjs/component'

export default class GlobalComponent extends Component {
  constructor(namespace) {
    super(namespace, window.Pj.doc.documentElement)

    if (!window.Pj.instances[this.plugin]) {
      return
    }
    this.instanceId = window.Pj.instances[this.plugin].length + 1
    window.Pj.instances[this.plugin].push(this)
  }

  destroy() {
    window.Pj.instances[this.plugin] = window.Pj.instances[this.plugin].filter(
      instance => instance !== this
    )
    window.Pj[this.plugin] = null
  }
}
