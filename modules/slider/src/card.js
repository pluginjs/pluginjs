import anime from 'animejs'
import { append, query } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import Image from './modules/image'
import Video from './modules/video'
import Iframe from './modules/iframe'
import Map from './modules/map'
import Inline from './modules/inline'

class Card {
  constructor(instance) {
    this.instance = instance
    this.classes = this.instance.classes
    this.data = this.instance.data

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('card')
    this.loader = query(`.${this.classes.LOADER}`, this.element)
  }

  createModule(data, index) {
    if (this.instance.modules[index]) {
      this.module = this.instance.modules[index]

      if (this.module.type === 'video') {
        this.module.reset()
      }
    } else {
      const type = data.type || 'image'
      removeClass(this.classes.LOADED, this.loader)

      switch (type) {
        case 'video':
          this.module = new Video(this.instance, data)
          break
        case 'iframe':
          this.module = new Iframe(this.instance, data)
          break
        case 'map':
          this.module = new Map(this.instance, data)
          break
        case 'inline':
          this.module = new Inline(this.instance, data)
          break
        default:
          this.module = new Image(this.instance, data)
          break
      }
      this.instance.modules[index] = this.module
    }
  }

  active() {
    addClass(this.classes.ACTIVE, this.element)
  }

  inactive() {
    removeClass(this.classes.ACTIVE, this.element)
  }

  getOffset() {
    return parseInt(anime.getValue(this.element, this.instance.axis), 10)
  }

  appendTo(target) {
    append(this.element, target)

    return this
  }
}
export default Card
