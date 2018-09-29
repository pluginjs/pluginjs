export const namespace = 'collapse'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESIZE: 'resize'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  CONTAINER: '{namespace}',
  COLLAPSED: '{namespace}-collapsed',
  EXPANDED: '{namespace}-expanded',
  HEADER: '{namespace}-header',
  CONTENT: '{namespace}-content',
  CONTENTINNER: '{namespace}-content-inner',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'toggle',
  'collapse',
  'expand'
]

export const defaults = {
  theme: null,
  instructions: false,
  collapsed: false,
  switch: false // custom switch (class name)
}
