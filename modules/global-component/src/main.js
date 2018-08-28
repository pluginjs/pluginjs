import Component from '@pluginjs/component'

export default class GlobalComponent extends Component {
  constructor() {
    super(window.document.documentElement)
  }
}
