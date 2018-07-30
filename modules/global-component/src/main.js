import Component from '@pluginjs/component'

export default class GlobalComponent extends Component {
  constructor(namespace) {
    super(namespace, window.document.documentElement)
  }
}
