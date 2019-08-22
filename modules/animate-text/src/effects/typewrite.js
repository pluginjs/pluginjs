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

    this.textArr = this.text.split('')
    this.chunk = Array(this.textArr.length + 1)
      .fill(1)
      .map((v, k) => k)

    const pauseArr = []
    const maxLen = this.options.duration / 100

    for (let i = 0; i < maxLen; i++) {
      pauseArr.push(this.chunk[this.chunk.length - 1])
    }

    this.indexList = this.chunk.concat(pauseArr, this.chunk.slice().reverse())
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
    const target = { textLen: 0 }

    const options = {
      targets: target,
      textLen: this.indexList.length - 1,
      round: 1,
      duration: this.options.duration || 2000,
      easing: 'linear',
      delay: this.options.delay,
      update: () => {
        const content = this.textArr
          .slice(0, this.indexList[target.textLen])
          .join('')
        text(`${content}`, this.content)
      }
    }

    anime
      .timeline({
        loop: this.options.loop || false
      })
      .add(options)
      .add({})
  }
}
