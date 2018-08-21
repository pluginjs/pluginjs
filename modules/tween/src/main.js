import SimpleEmitter from '@pluginjs/simple-emitter'
import Easing from '@pluginjs/easing'
import { isPlainObject, isArray, isNumber } from '@pluginjs/is'

/* Credit to https://between.js.org/ MIT */
const tweens = []

const COMPLETED = Symbol('completed')
const STARTED = Symbol('started')
const PAUSED = Symbol('paused')

function lerp(from, to, t) {
  return from * (1 - t) + to * t
}

const Engine = {
  running: false,
  isRunning() {
    return this.running
  },
  run() {
    this.running = true

    function animate(time) {
      time = Date.now()
      requestAnimationFrame(animate)

      Tween.update(time)
    }

    requestAnimationFrame(animate)
  }
}

const TYPES = []

export default class Tween extends SimpleEmitter {
  static of(...args) {
    return new Tween(...args)
  }

  static update(time) {
    for (let i = 0; i < tweens.length; i++) {
      const tween = tweens[i]
      const delta = time - tween.prevTime

      if (tween[STARTED] && !tween[COMPLETED]) {
        tween.update(delta, time - tween.startTime)

        tween.prevTime = time
      }
    }
  }

  constructor(props) {
    super()

    Object.assign(this, {
      props: Object.assign(
        {
          from: null,
          to: null,
          duration: 1000,
          easing: x => x
        },
        props
      ),

      elapsed: 0,
      prevTime: null,
      startTime: null,

      [COMPLETED]: false,
      [PAUSED]: false,
      [STARTED]: false,

      _complete: cb => cb(),
      _progress: x => x
    })

    const type = Object.values(TYPES).reduce((v, m) => {
      return v || (m && m.test && m.test(this.props.from) && m)
    }, false)

    if (type) {
      type.initialize(this.props, this)
    }

    tweens.push(this)
  }

  start() {
    this[STARTED] = true
    this.startTime = Date.now()
    this.prevTime = this.startTime

    if (!Engine.isRunning()) {
      Engine.run()
    }

    this.emit('start', this.value, this)

    return this
  }

  pause() {
    this[PAUSED] = true
    this.emit('pause', this.value, this)
    return this
  }

  isPaused() {
    return this[PAUSED]
  }

  isStarted() {
    return this[STARTED]
  }

  resume() {
    this[PAUSED] = false
    this.emit('resume', this.value, this)
    return this
  }

  easing(easing) {
    this.props.easing = easing
    return this
  }

  duration(duration) {
    this.props.duration = duration
    return this
  }

  update(delta, time) {
    if (this[COMPLETED]) {
      return
    }

    this.elapsed += delta

    this._interpolate(
      this.props.easing(
        this._progress(
          Math.min(1, (time || this.elapsed) / this.props.duration)
        )
      )
    )

    this.emit('update', this.value, this)

    if (this.elapsed >= this.props.duration) {
      this._complete(() => {
        this[COMPLETED] = true
        this.emit('complete', this.value, this)
      })
    }
  }

  static registerType(type) {
    TYPES.push(type)
  }
}

Tween.Easing = Easing

Tween.registerType({
  name: 'number',
  test(from) {
    return isNumber(from)
  },
  initialize(props, instance) {
    const { from, to } = props

    Object.assign(instance, {
      value: from,
      _interpolate: progress => {
        instance.value = lerp(from, to, progress)
      }
    })
  }
})

Tween.registerType({
  name: 'array',
  test(from) {
    return isArray(from)
  },
  initialize(props, instance) {
    const { from, to } = props
    const value = [].concat(from)
    const length = value.length

    Object.assign(instance, {
      value,
      _interpolate: progress => {
        for (let i = 0; i < length; i++) {
          value[i] = lerp(from[i], to[i], progress)
        }
      }
    })
  }
})

Tween.registerType({
  name: 'object',
  test(from) {
    return isPlainObject(from)
  },
  initialize(props, instance) {
    const { from, to } = props

    const value = Object.assign({}, from)
    const keys = Object.keys(from)
    const length = keys.length

    Object.assign(instance, {
      value,
      _interpolate: progress => {
        for (let i = 0; i < length; i++) {
          const key = keys[i]
          instance.value[key] = lerp(from[key], to[key], progress)
        }
      }
    })
  }
})
