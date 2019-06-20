import anime from 'animejs'
import { setStyle } from '@pluginjs/styled'
import { setData, getData } from '@pluginjs/dom'
import { deepMerge } from '@pluginjs/utils'
import EFFECTS from './effects'

class Animate {
  constructor(instance) {
    this.instance = instance
    this.effects = deepMerge({}, EFFECTS, this.instance.options.effects)

    this.effectName = !this.effects[this.instance.options.animate]
      ? null
      : this.instance.options.animate

    this.config = this.effectName
      ? deepMerge({}, this.effects[this.effectName].animeOpts)
      : {}
  }

  loading(chunks, callback) {
    const applyElements = this.getElements(chunks, this.effectName)

    applyElements.forEach((el, index) => {
      const config = Object.assign({}, this.config, {
        duration: this.instance.options.duration,
        delay: index * this.instance.options.delay,
        targets: el
      })

      const animation = anime(config)

      if (applyElements.length === index + 1) {
        animation.begin = () => {
          if (callback) {
            callback()
          }
        }
      }

      setData('animeApi', animation, el)
    })

    anime(this.config)
  }

  show(chunk) {
    const $el = this.getElement(chunk)
    const config = deepMerge({}, this.config, {
      duration: this.instance.options.duration,
      targets: $el
    })

    const animation = anime(config)

    setData('animeApi', animation, $el)
  }

  hide(chunk, callback) {
    const $el = chunk.element
    const animation = getData('animeApi', $el)

    if (!animation) {
      return
    }

    animation.begin = () => {
      if (callback) {
        callback()
      }
    }

    animation.autoplay = false
    animation.reverse()
    animation.play()
  }

  getElement(chunk) {
    const $el = chunk.element
    // console.log(chunk.movePosition)
    setStyle(
      {
        left: `${chunk.movePosition.x}px`,
        top: `${chunk.movePosition.y}px`
      },
      $el
    )

    chunk.info = Object.assign({}, chunk.info, chunk.movePosition)

    return $el
  }

  getElements(chunks, effectName) {
    const elements = []
    const effect = this.effects[effectName]

    chunks.forEach(chunk => {
      const $el = this.getElement(chunk)
      let elOpts = this.effects[effectName]
        ? Object.assign({}, this.effects[effectName].elOpts)
        : {}
      if (Object.keys(elOpts).length > 0) {
        elOpts = Object.assign({}, elOpts, { opacity: 0 })

        setStyle(elOpts, $el)
      }

      elements.push($el)
    })

    // reset chunks sort
    if (
      effect &&
      effect.resetChunksSort &&
      typeof effect.resetChunksSort === 'function'
    ) {
      elements.sort(effect.resetChunksSort)
    }

    return elements
  }
}

export default Animate
