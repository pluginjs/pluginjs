export const namespace = 'adaptText'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const methods = ['enable', 'disable', 'destroy', 'resize']

export const defaults = {
  ratio: 10,
  max: Number.POSITIVE_INFINITY,
  min: Number.NEGATIVE_INFINITY,
  scrollable: false,
  scrollSpeed: 1200,
  scrollResetSpeed: 300,
  resize: true
}

