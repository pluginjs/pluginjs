export const namespace = 'animateText'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}-multiple',
  WORD: '{namespace}-word',
  CHAR: '{namespace}-char',
  SPACE: '{namespace}-space'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  mode: 'fadeDown',
  loop: true,
  delay: 0,
  duration: 1000
}

export const dependencies = ['anime']
