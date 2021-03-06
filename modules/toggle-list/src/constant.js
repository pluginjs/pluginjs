import List from '@pluginjs/list'
import { deepMerge } from '@pluginjs/utils'
import Toggle from '@pluginjs/toggle'
import { setData } from '@pluginjs/dom'

export const namespace = 'toggleList'

export const events = deepMerge(List.events, {
  CHECK: 'check',
  UNCHECK: 'uncheck'
})

export const classes = deepMerge(List.classes, {
  NAMESPACE: 'pj-list',
  WRAPPER: '{namespace} pj-toggle-list',
  THEME: '{namespace}--{theme}',
  TOGGLE: '{namespace}-toggle',
  UNCHECKED: '{namespace}-unchecked',
  CHECKED: '{namespace}-checked'
})

export const methods = deepMerge(List.methods, ['toggle'])

export const defaults = deepMerge(List.defaults, {
  actions: [
    {
      action: 'toggle',
      init(instance, item, $item) {
        const api = Toggle.of(this, {
          classes: {
            WRAP: `{namespace} ${instance.classes.TOGGLE}`
          },
          size: 'small',
          checked: item.checked,
          clickable: true,
          dragable: false,
          onChange(checked) {
            const index = instance.getIndex($item)
            if (checked) {
              instance.check(index)
            } else {
              instance.uncheck(index)
            }
          }
        })
        setData('toggle', api, $item)
      }
    }
  ],
  templates: {
    action() {
      if (this.action === 'toggle') {
        return '<input type="checkbox" data-action="{action.action}">'
      }
      return '<i class="{classes.ACTION} {action.classes}" data-action="{action.action}" title="{action.label}"></i>'
    }
  }
})

export const dependencies = ['toggle', 'list']
