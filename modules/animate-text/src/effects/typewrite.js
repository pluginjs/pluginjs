import anime from 'animejs'
import { text, append } from '@pluginjs/dom'
import { addClass } from '@pluginjs/classes'

export default class Typewrite {
  constructor(instance) {
    this.instance = instance
    this.options = this.instance.options
    this.element = this.instance.element
    this.initialize()
    this.setupAnime()
  }

  initialize() {
    this.text = text(this.element)

    this.build()

    // this.alt = isArray(this.options.alt)
    //   ? this.options.alt
    //   : [].push(this.options.alt)

    // this.totalText = []

    this.textArr = this.text.split('')
    this.chunk = Array(this.textArr.length + 1)
      .fill(1)
      .map((v, k) => k)

    this.chunkReverse = this.chunk.slice().reverse()
  }

  build() {
    text('', this.element)

    this.content = document.createElement('span')
    addClass(this.instance.classes.WORD, this.content)
    text(this.text, this.content)
    append(this.content, this.element)

    this.cursor = document.createElement('span')
    addClass(this.instance.classes.CURSOR, this.cursor)
    text('|', this.cursor)
    append(this.cursor, this.element)
  }

  setupAnime() {
    const startTarget = { textLen: 0 }
    const endTarget = { textLen: 0 }

    const startOptions = {
      targets: startTarget,
      textLen: this.chunk.length - 1,
      round: 1,
      duration: this.options.duration,
      easing: 'linear',
      delay: this.options.delay,
      update: () => {
        const content = this.textArr
          .slice(0, this.chunk[startTarget.textLen])
          .join('')
        text(`${content}`, this.content)
      },
      complete: () => {
        startTarget.textLen = 0
      },
      endDelay: 2000
    }
    const endOptions = {
      targets: endTarget,
      textLen: this.chunkReverse.length - 1,
      round: 1,
      duration: this.options.duration,
      easing: 'linear',
      update: () => {
        const content = this.textArr
          .slice(0, this.chunkReverse[endTarget.textLen])
          .join('')
        text(`${content}`, this.content)
      },
      endDelay: 1500,
      complete: () => {
        endTarget.textLen = 0
        this.anime.pause()
        animeSetup()
      }
    }

    const that = this

    function animeSetup() {
      if (that.options.loop) {
        that.anime = anime
          .timeline({})
          .add(startOptions)
          .add(endOptions)
      } else {
        anime(startOptions)
      }
    }

    animeSetup()
  }
}
