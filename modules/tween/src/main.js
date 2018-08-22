import SimpleEmitter from '@pluginjs/simple-emitter'
import Easing from '@pluginjs/easing'
import { isPlainObject, isArray, isNumber, isNull } from '@pluginjs/is'

/* Credit to https://between.js.org/ MIT */

const COMPLETED = Symbol('completed')
const STARTED = Symbol('started')
const PAUSED = Symbol('paused')

function lerp(from, to, t) {
  return from * (1 - t) + to * t
}

const Engine = {
  requestId: null,
  tweens: [],
  add(tween) {
    if (!this.tweens.includes(tween)) {
      this.tweens.push(tween)
    }

    if (!this.isRunning()) {
      this.run()
    }
  },
  remove(tween) {
    this.tweens = this.tweens.filter(item => item !== tween)

    if (this.tweens.length === 0) {
      this.stop()
    }
  },
  isRunning() {
    return !isNull(this.requestId)
  },
  run() {
    const animate = (time = Date.now()) => {
      this.requestId = window.requestAnimationFrame(animate)

      this.update(time)
    }

    this.requestId = window.requestAnimationFrame(animate)
  },
  stop() {
    window.cancelAnimationFrame(this.requestId)
    this.requestId = null
  },
  update(time) {
    const tweens = this.tweens
    const length = tweens.length
    for (let i = 0; i < length; i++) {
      const tween = tweens[i]
      const delta = time - tween.prevTime

      if (tween[STARTED] && !tween[COMPLETED]) {
        if (!tween[PAUSED]) {
          tween.update(delta)
        }

        tween.prevTime = time
      }
    }
  }
}

const TYPES = []

export default class Tween extends SimpleEmitter {
  static of(...args) {
    return new Tween(...args)
  }

  static update(time) {
    Engine.update(time)
  }

  constructor(props) {
    super()

    Object.assign(this, {
      props: Object.assign(
        {
          from: null,
          to: null,
          duration: 1000,
          easing: x => x,
          delay: 0
        },
        props
      ),

      elapsed: 0,
      delayed: 0,
      paused: 0,
      prevTime: null,
      startTime: null,
      pauseTime: null,

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
  }

  start() {
    if (!this[STARTED]) {
      this[STARTED] = true
      this.startTime = Date.now()
      this.prevTime = this.startTime
      this.delayed = 0

      if (this.elapsed) {
        this.startTime -= this.elapsed
      }

      Engine.add(this)

      this.emit('start', this.value, this)
    }

    return this
  }

  stop() {
    if (this[STARTED]) {
      this[STARTED] = false

      Engine.remove(this)

      this.emit('stop', this.value, this)
    }

    return this
  }

  pause() {
    if (!this[PAUSED]) {
      this[PAUSED] = true
      this.pauseTime = Date.now()

      this.emit('pause', this.value, this)
    }

    return this
  }

  resume() {
    if (this[PAUSED]) {
      this[PAUSED] = false
      this.paused += Date.now() - this.pauseTime

      this.emit('resume', this.value, this)
    }

    return this
  }

  restart() {
    Engine.remove(this)

    Object.assign(this, {
      elapsed: 0,
      delayed: 0,
      paused: 0,
      prevTime: Date.now(),
      startTime: Date.now(),
      pauseTime: null,

      [COMPLETED]: false,
      [PAUSED]: false,
      [STARTED]: true
    })

    this.update(0)
    this.emit('restart', this.value, this)

    Engine.add(this)

    return this
  }

  isPlaying() {
    return this[STARTED] && !this[PAUSED] && !this[COMPLETED]
  }

  isPaused() {
    return this[PAUSED]
  }

  isStarted() {
    return this[STARTED]
  }

  isCompleted() {
    return this[COMPLETED]
  }

  delay(delay) {
    this.props.delay = delay
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

  seek(time) {
    this._interpolate(
      this.props.easing(this._progress(Math.min(1, time / this.props.duration)))
    )

    this.emit('update', this.value, this)
  }

  update(delta) {
    if (this[COMPLETED]) {
      return
    }

    if (this.props.delay && this.delayed < this.props.delay) {
      this.delayed += delta

      return
    }

    this.elapsed += delta

    this.seek(this.elapsed)

    if (this.elapsed >= this.props.duration) {
      this._complete(() => {
        this[COMPLETED] = true

        Engine.remove(this)
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
