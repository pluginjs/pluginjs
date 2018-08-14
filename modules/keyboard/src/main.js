import Emitter from '@pluginjs/emitter'
import { each } from '@pluginjs/utils'

/* eslint object-property-newline: 'off' */
const MAP_BY_CODE = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  20: 'caps_lock',
  27: 'esc',
  32: 'space',
  33: 'page_up',
  34: 'page_down',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'insert',
  46: 'delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'command',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  144: 'num_lock'
}

const MAP_BY_NAME = {}

for (const key in MAP_BY_CODE) {
  if (Object.prototype.hasOwnProperty.call(MAP_BY_CODE, key)) {
    MAP_BY_NAME[MAP_BY_CODE[key]] = Number(key)
  }
}

const MODIFIERS = {
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  91: 'command'
}

class Keyboard {
  constructor(element) {
    this.element = element || window.document
    this.emitter = new Emitter()

    this.initialize()
    this.registerEvent()
  }

  initialize() {
    this.status = {}
    each(MODIFIERS, (keyCode, keyName) => {
      this.status[keyName] = false

      this.emitter.on(`${keyCode}down`, () => {
        if (this.status[keyName]) {
          return
        }
        this.status[keyName] = true
      })
      this.emitter.on(`${keyCode}up`, () => {
        if (!this.status[keyName]) {
          return
        }
        this.status[keyName] = false
      })
    })
  }

  registerEvent() {
    const handler = e => this.handler(e)
    this.element.addEventListener('keydown', handler)
    this.element.addEventListener('keyup', handler)
  }

  handler(e) {
    /* eslint consistent-return: "off" */
    let keyCode = e.keyCode
    const action = e.type === 'keydown' ? 'down' : 'up'
    let prefix = ''

    if (keyCode === 93 || keyCode === 224) {
      keyCode = 91
    }

    // if (!this.filter(e)) return;

    if (keyCode in MODIFIERS) {
      const result = this.emitter.emit(keyCode + action)
      if (result === false) {
        return false
      }
    }

    each(this.status, (keyName, status) => {
      if (status) {
        prefix += keyName
      }
    })

    const eventName = prefix + keyCode + action

    if (!(eventName in this.emitter.listeners)) {
      return
    }

    return this.emitter.emit(eventName)
  }

  on(action, key, func) {
    return this.dispatch(true, action, key, func)
  }

  off(action, key, func) {
    return this.dispatch(false, action, key, func)
  }

  dispatch(toggle, action, key, func) {
    const keys = this.parseKeys(this.processKey(key))
    keys.forEach(key => {
      const modifiers = key.modifiers
      const keyCode = key.keyCode
      let prefix = ''

      if (modifiers !== null) {
        for (let i = 0; i < modifiers.length; i++) {
          prefix += MODIFIERS[modifiers[i]]
        }
      }

      if (toggle) {
        this.emitter.on(prefix + keyCode + action, func)
      } else {
        this.emitter.off(prefix + keyCode + action, func)
      }
    })

    return this
  }

  parseKeys(keys) {
    const newKeys = []
    keys.map(key => {
      const newKey = {}
      let modifiers = null

      key = key.split('+')
      const length = key.length

      if (length > 1) {
        modifiers = this.processModifiers(key)
        key = [key[length - 1]]
      }

      key = this.getKeyCode(key[0])

      newKey.modifiers = modifiers
      newKey.keyCode = key
      newKeys.push(newKey)
      return key
    })

    return newKeys
  }

  processKey(key) {
    key = key.toLowerCase().replace(/\s/g, '')
    const keys = key.split(',')
    if (keys[keys.length - 1] === '') {
      keys[keys.length - 2] += ','
    }
    return keys
  }

  processModifiers(key) {
    const modifiers = key.slice(0, key.length - 1)

    for (let i = 0; i < modifiers.length; i++) {
      modifiers[i] = MAP_BY_NAME[modifiers[i]]
    }

    modifiers.sort()

    return modifiers
  }

  distribute(action, key, func) {
    return func === null || typeof func === 'undefined'
      ? this.off(action, key, func)
      : this.on(action, key, func)
  }

  getKeyName(keyCode) {
    return MAP_BY_CODE[keyCode]
  }

  getKeyCode(keyName) {
    return MAP_BY_NAME[keyName]
  }

  up(key, func) {
    return this.distribute('up', key, func)
  }

  down(key, func) {
    return this.distribute('down', key, func)
  }

  static of(...args) {
    return new this(...args)
  }
}

const keyboard = (...args) => Keyboard.of(...args)

export default keyboard
