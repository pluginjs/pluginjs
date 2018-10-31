export const namespace = 'animateText'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  SWITCH: '{namespace}-switch',
  WORD: '{namespace}-word',
  CHAR: '{namespace}-char',
  SPACE: '{namespace}-space',
  CURSOR: '{namespace}-cursor'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  mode: 'fadeDown',
  loop: true,
  delay: 0,
  duration: 1000
}

export const dependencies = ['anime']
