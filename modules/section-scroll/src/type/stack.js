import { queryAll } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'

class Stack {
  constructor(instance) {
    this.instance = instance
    this.options = this.instance.options
    this.$sections = this.instance.$sections
    this.second = this.options.duration / 1000
    this.init()
  }

  init() {
    this.$sections.forEach(ele => {
      setStyle(
        {
          transition: `${this.second}s transform ${this.options.easing}`,
          width: '100%'
        },
        ele
      )
    })
    queryAll('html, body').forEach(ele => {
      setStyle('overflow', 'hidden', ele)
    })

    this.initSection()
  }

  initSection() {
    let i = 0
    const that = this
    this.$sections.forEach(section => {
      const index = Math.abs(i - that.$sections.length)
      setStyle('position', 'absolute', section)
      section.style.zIndex = index
      i++
    })
  }
}

export default Stack
