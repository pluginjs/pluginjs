import SimpleEmitter from '@pluginjs/simple-emitter'
import Easing from '@pluginjs/easing'
import { getTime } from '@pluginjs/utils'
import {
  isPlainObject,
  isArray,
  isNumber,
  isNull,
  isString
} from '@pluginjs/is'

/* Credit to https://between.js.org/ MIT */

const COMPLETED = Symbol('completed')
const STARTED = Symbol('started')
const PAUSED = Symbol('paused')
const REVERSED = Symbol('reversed')

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
    const tick = time => {
      time = getTime()
      this.requestId = window.requestAnimationFrame(tick)

      this.tick(time)
    }

    this.requestId = window.requestAnimationFrame(tick)
  },
  stop() {
    window.cancelAnimationFrame(this.requestId)
    this.requestId = null
  },
  tick(time) {
    const tweens = this.tweens
    const length = tweens.length
    for (let i = 0; i < length; i++) {
      const tween = tweens[i]
      const delta = time - tween.lastTime

      if (tween[STARTED] && !tween[COMPLETED]) {
        if (!tween[PAUSED]) {
          tween.tick(delta, time - tween.startTime - tween.paused)
        }

        tween.lastTime = time
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
          delay: 0,
          loop: false,
          direction: 'normal', // reverse, alternate
          autoplay: true
        },
        props
      ),

      elapsed: null,
      delayed: 0,
      paused: 0,
      lastTime: null,
      startTime: null,
      pauseTime: null,

      [COMPLETED]: false,
      [PAUSED]: false,
      [STARTED]: false,
      [REVERSED]: props.direction === 'reverse',

      remaining: props.loop ? props.loop : false,

      _complete: cb => cb()
    })

    if (isString(this.props.easing)) {
      this.props.easing = Easing.get(this.props.easing)
    }

    const type = Object.values(TYPES).reduce((v, m) => {
      return v || (m && m.test && m.test(this.props.from) && m)
    }, false)

    if (type) {
      type.initialize(this.props, this)
    }

    if (this.props.autoplay) {
      this.start()
    }
  }

  start() {
    if (!this[STARTED]) {
      this[STARTED] = true
      this.startTime = getTime()
      this.lastTime = this.startTime
      this.delayed = null

      if (this.elapsed) {
        this.startTime -= this.elapsed
      }

      Engine.add(this)
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
      this.pauseTime = getTime()

      this.emit('pause', this.value, this)
    }

    return this
  }

  resume() {
    if (this[PAUSED]) {
      this[PAUSED] = false
      this.paused += getTime() - this.pauseTime

      this.emit('resume', this.value, this)
    }

    return this
  }

  restart() {
    this._reset()

    this[STARTED] = true
    this.startTime = getTime()
    this.lastTime = this.startTime
    this.delayed = null

    this.emit('restart', this.value, this)

    Engine.add(this)

    return this
  }

  _reset() {
    Engine.remove(this)

    Object.assign(this, {
      elapsed: null,
      delayed: 0,
      paused: 0,
      lastTime: null,
      startTime: null,
      pauseTime: null,

      [COMPLETED]: false,
      [PAUSED]: false,
      [STARTED]: false,
      [REVERSED]: this.props.direction === 'reverse',
      remaining: this.props.loop ? this.props.loop : false
    })

    this.seek(0)
  }

  reset() {
    this._reset()
    this.emit('reset', this.value, this)

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

  isReversed() {
    return this[REVERSED]
  }

  from(from) {
    this.props.from = from
    return this
  }

  to(to) {
    this.props.to = to
    return this
  }

  delay(delay) {
    this.props.delay = delay
    return this
  }

  loop(loop) {
    this.props.loop = loop
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

  _progress(x) {
    if (this[REVERSED]) {
      return 1 - x
    }
    return x
  }

  _toggleReverse() {
    this[REVERSED] = !this[REVERSED]
  }

  reverse() {
    this._toggleReverse()

    this.elapsed = this.props.duration - this.elapsed
  }

  finish() {
    this[COMPLETED] = true

    Engine.remove(this)
    this.seek(this.duration)
    this.emit('complete', this.value, this)
  }

  seek(time) {
    const { easing, duration } = this.props

    this._interpolate(easing(this._progress(Math.min(1, time / duration))))

    this.emit('update', this.value, this)
  }

  clear() {
    this.off()
    Engine.remove(this)
  }

  tick(delta) {
    if (this[COMPLETED]) {
      return
    }

    if (isNull(this.elapsed)) {
      this.elapsed = 0
      this.emit('start', this.value, this)
    }

    if (this.props.delay && this.delayed < this.props.delay) {
      if (this.delayed === -1) {
        this.seek(0)

        this.delayed = delta
      } else {
        this.delayed += delta
      }

      return
    }

    this.elapsed += delta

    this.seek(this.elapsed)

    if (this.elapsed >= this.props.duration) {
      if (this.props.direction === 'alternate') {
        this._toggleReverse()

        this.elapsed = 0

        if (this[REVERSED] === true) {
          return
        }
      }

      if (this.remaining && this.remaining !== true) {
        this.remaining--
      }

      if (this.remaining) {
        this.startTime = getTime()
        this.paused = 0
        this.elapsed = 0
        if (this.props.delay) {
          this.delayed = -1
        }
      } else {
        this._complete(() => {
          this[COMPLETED] = true

          Engine.remove(this)
          this.emit('complete', this.value, this)
        })
      }
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
