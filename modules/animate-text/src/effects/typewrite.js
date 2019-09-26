import anime from 'animejs'
import { text, append } from '@pluginjs/dom'
import { addClass } from '@pluginjs/classes'
import { isArray } from '@pluginjs/is'

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

    this.textArr = this.text.split('')
    this.chunk = Array(this.textArr.length + 1)
      .fill(1)
      .map((v, k) => k)

    this.chunkReverse = this.chunk.slice().reverse()

    this.initTextOptions()
  }

  initTextOptions() {
    this.alt = isArray(this.options.alt)
      ? this.options.alt
      : Array.of(this.options.alt)

    this.totalText = Array.of({
      textArr: this.textArr,
      chunk: this.chunk,
      chunkReverse: this.chunkReverse
    })

    this.alt.forEach(word => {
      const textArr = word.split('')
      const chunk = Array(textArr.length + 1)
        .fill(1)
        .map((v, k) => k)
      const chunkReverse = chunk.slice().reverse()
      this.totalText.push({
        textArr,
        chunk,
        chunkReverse
      })
    })
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
    let count = 0
    const startTarget = { textLen: 0 }
    const endTarget = { textLen: 0 }

    const startOptions = {
      targets: startTarget,
      textLen: this.totalText[count].chunk.length - 1,
      round: 1,
      duration: this.options.duration,
      easing: 'easeInOutSine',
      update: () => {
        const content = this.totalText[count].textArr
          .slice(0, this.totalText[count].chunk[startTarget.textLen])
          .join('')
        text(`${content}`, this.content)
      },
      complete: () => {
        startTarget.textLen = 0
        if (count === this.totalText.length - 1 && !this.options.loop) {
          this.anime.pause()
        }
      },
      endDelay: 2000
    }
    const endOptions = {
      targets: endTarget,
      textLen: this.totalText[count].chunkReverse.length - 1,
      round: 1,
      duration: this.options.duration / 3,
      easing: 'linear',
      update: () => {
        const content = this.totalText[count].textArr
          .slice(0, this.totalText[count].chunkReverse[endTarget.textLen])
          .join('')
        text(`${content}`, this.content)
      },
      complete: () => {
        endTarget.textLen = 0
        this.anime.pause()
        if (this.options.loop && count === this.totalText.length - 1) {
          count = -1
        }
        if (count < this.totalText.length - 1) {
          count++
          animeSetup()
        }
      }
    }

    const that = this

    function animeSetup() {
      startOptions.textLen = that.totalText[count].chunk.length - 1
      endOptions.textLen = that.totalText[count].chunkReverse.length - 1
      that.anime = anime
        .timeline({})
        .add(startOptions)
        .add(endOptions)
    }

    animeSetup()
  }
}
