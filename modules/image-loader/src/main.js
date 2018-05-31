import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import Pj, {
  eventable,
  register,
  stateable,
  styleable
} from '@pluginjs/pluginjs'

import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS
  },
  INFO
)
class ImageLoader extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(true, {}, DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    this.history = []
    this.imgLoadAll = []
    this.selector = this.options.selector || 'img'

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.$imgs = Array.from(this.getImgs())

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  /*
   * When a img loading success.
   */
  onProgress(callback) {
    this.element.addEventListener('progress', event => {
      callback.apply(this, [event.detail.el, this])
    })

    return this
  }
  /*
   * When all of imgs loading success.
   */
  isDone(callback) {
    Promise.all(this.imgLoadAll)
      .then(imgs => {
        callback(imgs)
      })
      .catch(err => false)

    return this
  }

  // /*
  //  * when all of imgs loading failed.
  //  */
  // isFailed(callback) {
  //   Promise.all(this.imgLoadAll)
  //     .catch(err => {
  //       return false;
  //     }).finally(() => {
  //       // console.log(this.fail)
  //       if (this.fail === this.imgLoadAll.length) {
  //         callback();
  //         // console.log('is failed => ', this.imgLoadAll)
  //       }
  //     })

  //   return this;
  // }

  /*
   * When all of imgs loading end.
   */
  isFinally(callback) {
    Promise.all(this.imgLoadAll)
      .catch(
        err =>
          // console.error('finally,but has error: ', this.fail)
          false
      )
      .finally(() => {
        callback()
      })
  }

  getImgs() {
    return this.element.querySelectorAll(this.selector)
  }

  add(imgs) {
    this.done = 0
    this.fail = 0
    this.imgLoadAll = []
    this.$imgs = []

    if (Array.isArray(imgs)) {
      imgs.forEach(imgSrc => {
        const $img = new Image()
        $img.src = imgSrc

        this.element.append($img)
        this.$imgs.push($img)
      })
    }

    this.loading()

    return this
  }

  load(imgs) {
    this.done = 0
    this.fail = 0
    this.imgLoadAll = []

    if (imgs) {
      this.add(imgs)
    } else {
      this.loading()
    }

    return this
  }

  loading() {
    this.history = [].concat([this.history, this.$imgs])

    this.$imgs.forEach($img => {
      const imgLoad = new Promise((resolve, reject) => {
        if ($img.complete) {
          this.done += 1

          resolve($img)
        }

        $img.addEventListener('load', () => {
          this.done += 1

          const event = new CustomEvent('progress', { detail: { el: $img } })
          this.element.dispatchEvent(event)

          resolve($img)
        })

        $img.addEventListener('error', () => {
          this.fail += 1

          reject($img)
        })
      })

      this.imgLoadAll.push(imgLoad)
    })
  }

  unbind() {
    this.element.removeEventListener('progress')
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default ImageLoader
