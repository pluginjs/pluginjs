import { query } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import HeardRoom from '@pluginjs/headroom'

const element = query('#default .example')
const actions = query('#default .actions')
const headroom = HeardRoom.of(element, {})

bindEvent(
  'click',
  '.pj-btn',
  function() {
    headroom.modal.destroy()
    headroom.options.type = this.dataset.api
    headroom.initialize()
  },
  actions
)
