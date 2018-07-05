import { query } from '@pluginjs/dom'
import Choice from '@pluginjs/choice'

const element = query('#event .select-event')
Choice.of(element, {
  onChange(val) {
    console.log(`change: ${val}`, 'change')
  },
  onSelect(val, item) {
    console.log(`select: ${val}  item: ${JSON.stringify(item)}`, 'select')
  },
  onUnselect(val, item) {
    console.log(`unselect: ${val}  item: ${JSON.stringify(item)}`, 'unselect')
  },
  onReady() {
    console.log('ready', 'event')
  },
  onDestroy() {
    console.log('destroy', 'event')
  },
  onEnable() {
    console.log('enable', 'event')
  },
  onDisable() {
    console.log('disable', 'event')
  }
})
