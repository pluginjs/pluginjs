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
  duration: 1000,
  alt: [] // switch words.  example: ['word1', 'word2']
}

export const dependencies = ['anime']
