export const namespace = 'timePicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}-wrap',
  INFO: '{namespace}-info',
  DROPDOWN: '{namespace}-dropdown',
  REMOVE: '{namespace}-remove'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'get',
  'val',
  'set',
  'timeLimit',
  'observeOtherTimePicker'
]

export const defaults = {
  value: null,
  name: 'time-picker',
  use24HourFormat: true,
  placeholder: 'Select Time',
  keyboard: true,
  disabled: false,
  max: '',
  min: '',
  step: 30
  // templates: {
  //   inputLabel() {
  //     return '<input class="{that.classes.LABEL}" placeholder="{that.options.placeholder}" />'
  //   },
  //   label() {
  //     return '<span class="{that.classes.LABEL}"></span>'
  //   },
  //   icon() {
  //     return '<i class="{that.classes.ICON} {icon}"></i>'
  //   },
  //   panel() {
  //     return '<ul></ul>'
  //   },
  //   item() {
  //     return '<li class="{that.classes.ITEM}" data-{that.options.itemValueAttr}="{tag}">{item.label}</li>'
  //   }
  // }
}

export const dependencies = ['dropdown', 'input-mask']
