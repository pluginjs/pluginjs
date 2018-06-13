import { addClass, removeClass } from '@pluginjs/classes'
import anime from 'animejs'
import KEYFRAMES from '@pluginjs/keyframes'
import { keyframes2Anime } from '@pluginjs/utils'

class Effect {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    if (this.instance.options.effect === false) {
      return
    }

    this.instance.effects = {
      in: this.instance.options.effect,
      out: this.revertClass(this.instance.options.effect)
    }
  }

  revertClass(str) {
    const classes = str.split(' ')
    const inre = ['Up', 'Down', 'In', 'Out', 'Left', 'Right', 'Top', 'Bottom']
    const len = classes.length
    const outre = ['Down', 'Up', 'Out', 'In', 'Right', 'Left', 'Bottom', 'Top']
    let [output, re, reNum] = ['', '', '']
    const reArray = []

    for (let n = 0; n < len; n++) {
      for (let m = 0; m < inre.length; m++) {
        re = new RegExp(inre[m])
        if (re.test(classes[n])) {
          reArray.push(m)
        }
      }
      for (let l = 0; l < reArray.length; l++) {
        reNum = reArray[l]
        classes[n] = classes[n].replace(inre[reNum], reNum)
      }
      for (let k = 0; k < reArray.length; k++) {
        reNum = reArray[k]
        classes[n] = classes[n].replace(reNum, outre[reNum])
      }
      output += ` ${classes[n]}`
    }
    return output.trim()
  }

  animation(previous, current) {
    if (this.instance.options.effect === false) {
      return
    }

    const $current = this.instance.panes[current]
    const $previous = this.instance.panes[previous]
    const duration = parseInt(this.instance.options.duration, 10)

    this.instance.isAnimating = true

    if (this.instance.effects.in !== this.instance.options.effect) {
      this.instance.effects = {
        out: this.revertClass(this.instance.options.effect),
        in: this.instance.options.effect
      }
    }
    const keyframes = keyframes2Anime(KEYFRAMES[this.instance.effects.out])
    $previous.style.cssText = ''

    const config = {
      targets: $previous,
      ...keyframes,
      duration: duration / 2,
      easing: 'easeOutExpo',
      complete: () => {
        removeClass(this.instance.classes.ACTIVE, $previous)
        addClass(this.instance.classes.ACTIVE, $current)
        this.active()
        $current.style.cssText = ''
        anime({
          targets: $current,
          ...keyframes2Anime(KEYFRAMES[this.instance.effects.in]),
          duration: duration / 2,
          easing: 'easeOutExpo'
        })
      }
    }
    anime(config)
    this.instance.isAnimating = false
  }

  active() {
    let height = this.instance.getCurrentPane().clientHeight
    if (this.instance.vertical) {
      height = Math.max(this.instance.panelMinHeight, height)
    }

    this.instance.content.style.cssText = ''
    anime({
      targets: this.instance.content,
      height: [this.instance.previousHeight, height],
      duration: this.instance.options.duration / 2,
      easing: 'easeOutExpo'
    })
  }
}
export default Effect
