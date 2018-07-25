import is from '@pluginjs/is'
import anime from 'animejs'
import { setStyle } from '@pluginjs/styled'
import { setObjData, getObjData } from '@pluginjs/dom'
import { deepMerge } from '@pluginjs/utils'

const EFFECTS = {
  bounce: {
    animeOpts: {
      duration: 800,
      elasticity: 600,
      delay(el, i) {
        return i * 100
      },
      opacity: {
        value: [0, 1],
        duration: 1000,
        easing: 'linear'
      },
      scaleX: {
        value: [0.4, 1],
        duration: 800
      },
      scaleY: {
        value: [0.6, 1],
        duration: 1000
      }
    }
  },
  bounceIn: {
    animeOpts: {
      duration: 900,
      elasticity: 500,
      delay(el, i) {
        return i * 15
      },
      opacity: {
        value: [0, 1],
        duration: 300,
        easing: 'linear'
      },
      translateX() {
        return [anime.random(0, 1) === 0 ? 100 : -100, 0]
      },
      translateY() {
        return [anime.random(0, 1) === 0 ? 100 : -100, 0]
      }
    }
  },
  calendar: {
    elOpts: {
      perspective: '800px',
      'transform-origin': '50% 0%'
    },
    animeOpts: {
      duration: 1500,
      elasticity: 400,
      delay(el, i) {
        return i * 75
      },
      opacity: {
        value: [0, 1],
        duration: 1000,
        easing: 'linear'
      },
      rotateX: [-90, 0]
    }
  },
  cards: {
    animeOpts: {
      duration: 600,
      easing: 'easeOutExpo',
      delay(el, i) {
        return i * 100
      },
      opacity: {
        value: [0, 1],
        duration: 100,
        easing: 'linear'
      },
      translateX(el) {
        const docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft
        }

        const x1 = window.innerWidth / 2 + docScrolls.left

        const tBounds = el.getBoundingClientRect()

        const x2 = tBounds.left + docScrolls.left + tBounds.width / 2

        return [x1 - x2, 0]
      },
      translateY(el) {
        const docScrolls = {
          top: document.body.scrollTop + document.documentElement.scrollTop
        }

        const y1 = window.innerHeight + docScrolls.top

        const tBounds = el.getBoundingClientRect()

        const y2 = tBounds.top + docScrolls.top + tBounds.height / 2

        return [y1 - y2, 0]
      },
      rotate(el) {
        const x1 = window.innerWidth / 2

        const tBounds = el.getBoundingClientRect()

        const x2 = tBounds.left + tBounds.width / 2

        return [x2 < x1 ? 90 : -90, 0]
      },
      scale: [0, 1]
    }
  },
  fadeInDown: {
    resetChunksSort(a, b) {
      const aBounds = a.getBoundingClientRect()
      const bBounds = b.getBoundingClientRect()

      return aBounds.left - bBounds.left || aBounds.top - bBounds.top
    },
    animeOpts: {
      duration(el, i) {
        return 500 + i * 50
      },
      easing: 'easeOutExpo',
      delay(el, i) {
        return i * 20
      },
      opacity: {
        value: [0, 1],
        duration(el, i) {
          return 250 + i * 50
        },
        easing: 'linear'
      },
      translateY: [-400, 0]
    }
  },
  fadeInUp: {
    resetChunksSort(a, b) {
      const aBounds = a.getBoundingClientRect()
      const bBounds = b.getBoundingClientRect()

      return aBounds.left - bBounds.left || aBounds.top - bBounds.top
    },
    animeOpts: {
      duration(el, i) {
        return 500 + i * 50
      },
      easing: 'easeOutExpo',
      delay(el, i) {
        return i * 20
      },
      opacity: {
        value: [0, 1],
        duration(el, i) {
          return 250 + i * 50
        },
        easing: 'linear'
      },
      translateY: [400, 0]
    }
  },
  fadeInLeft: {
    resetChunksSort(a, b) {
      return b.getBoundingClientRect().left - a.getBoundingClientRect().left
    },
    animeOpts: {
      duration: 800,
      easing: [0.1, 1, 0.3, 1],
      delay(el, i) {
        return i * 20
      },
      opacity: {
        value: [0, 1],
        duration: 600,
        easing: 'linear'
      },
      translateX: [-500, 0],
      rotateZ: [15, 0]
    }
  },
  fadeInRight: {
    resetChunksSort(a, b) {
      return b.getBoundingClientRect().left - a.getBoundingClientRect().left
    },
    animeOpts: {
      duration: 800,
      easing: [0.1, 1, 0.3, 1],
      delay(el, i) {
        return i * 20
      },
      opacity: {
        value: [0, 1],
        duration: 600,
        easing: 'linear'
      },
      translateX: [500, 0],
      rotateZ: [-15, 0]
    }
  },
  fan: {
    resetChunksSort(a, b) {
      const docScrolls = {
        top: document.body.scrollTop + document.documentElement.scrollTop
      }

      const y1 = window.innerHeight + docScrolls.top

      const aBounds = a.getBoundingClientRect()

      const ay1 = aBounds.top + docScrolls.top + aBounds.height / 2

      const bBounds = b.getBoundingClientRect()

      const by1 = bBounds.top + docScrolls.top + bBounds.height / 2

      return Math.abs(y1 - ay1) - Math.abs(y1 - by1)
    },
    elOpts: {
      perspective: '1000px',
      'transform-origin': '50% 0%'
    },
    animeOpts: {
      duration: 800,
      easing: [0.1, 1, 0.3, 1],
      delay(el, i) {
        return i * 35
      },
      opacity: {
        value: [0, 1],
        duration: 600,
        easing: 'linear'
      },
      translateX: [100, 0],
      translateY: [-100, 0],
      translateZ: [400, 0],
      rotateZ: [10, 0],
      rotateX: [75, 0]
    }
  },
  flip: {
    elOpts: { perspective: '3000px' },
    animeOpts: {
      duration() {
        return anime.random(500, 1000)
      },
      easing: [0.2, 1, 0.3, 1],
      delay(el, i) {
        return i * 50
      },
      opacity: {
        value: [0, 1],
        duration: 700,
        easing: 'linear'
      },
      translateZ: {
        value: [-3000, 0],
        duration: 1000
      },
      rotateY: [-360, 0]
    }
  },
  zoomIn: {
    animeOpts: {
      duration(el, i) {
        return 600 + i * 75
      },
      easing: 'easeOutExpo',
      delay(el, i) {
        return i * 50
      },
      opacity: {
        value: [0, 1],
        easing: 'linear'
      },
      scale: [1.8, 1]
    }
  },
  zoomOut: {
    animeOpts: {
      duration(el, i) {
        return 600 + i * 75
      },
      easing: 'easeOutExpo',
      delay(el, i) {
        return i * 50
      },
      opacity: {
        value: [0, 1],
        easing: 'linear'
      },
      scale: [0, 1]
    }
  }
}

class Animate {
  constructor(instanced) {
    this.api = instanced
    this.effects = deepMerge({}, EFFECTS, this.api.options.effects)
    this.effectName = is.emptyObject(this.effects[this.api.options.animate])
      ? 'fadeInUp'
      : this.api.options.animate
    this.config = deepMerge({}, this.effects[this.effectName].animeOpts)
  }

  loading(chunks, callback) {
    // get chunks element
    const applyEls = this.getEls(chunks, this.effectName)

    // handle config
    applyEls.forEach((el, index) => {
      const config = Object.assign({}, this.config, {
        duration: this.api.options.duration,
        delay: index * this.api.options.delay,
        targets: el
      })

      const animation = anime(config)
      animation.begin = () => {
        // addClass(this.api.classes.SHOW, $(el))
        // el.style.display = 'block'
      }

      if (applyEls.length === index + 1) {
        animation.begin = () => {
          if (callback) {
            callback()
          }
        }
      }

      setObjData('animeApi', animation, el)
    })
    // run the animation
    anime(this.config)
  }

  show(chunk) {
    const $el = this.getEl(chunk)
    const config = deepMerge({}, this.config, {
      duration: this.api.options.duration,
      targets: $el
    })

    const animation = anime(config)

    setObjData('animeApi', animation, $el)
  }

  hide(chunk) {
    const $el = chunk.$el
    const animation = getObjData('animeApi', $el)

    if (!animation) {
      return
    }

    animation.autoplay = false
    animation.reverse()
    animation.play()
  }

  getEl(chunk) {
    const $el = chunk.$el
    // const el = $el[0]

    setStyle(
      {
        left: chunk.movePosition.x,
        top: chunk.movePosition.y
      },
      $el
    )

    chunk.info = Object.assign({}, chunk.info, chunk.movePosition)

    return $el
  }

  getEls(chunks, effectName) {
    const els = []
    const effect = this.effects[effectName]

    chunks.forEach(chunk => {
      const $el = this.getEl(chunk)
      let elOpts = Object.assign({}, this.effects[effectName].elOpts)

      if (Object.keys(elOpts).length > 0) {
        elOpts = Object.assign({}, elOpts, { opacity: 0 })

        setStyle(elOpts, $el)
      }

      els.push($el)
    })

    // reset chunks sort
    if (
      effect.resetChunksSort &&
      typeof effect.resetChunksSort === 'function'
    ) {
      els.sort(effect.resetChunksSort)
    }

    return els
  }
}

export default Animate
