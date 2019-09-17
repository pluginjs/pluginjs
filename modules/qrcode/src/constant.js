export const namespace = 'qrcode'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy'
}

export const methods = ['destroy']

export const defaults = {
  text: '',
  padding: 10,
  width: 256,
  height: 256,
  correctLevel: 'H', // 'L', 'M', 'H', 'Q'
  reverse: false,
  background: '#ffffff',
  foreground: '#000000'
}

export const dependencies = []
