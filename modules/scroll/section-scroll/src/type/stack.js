import Base from './base'

class Stack extends Base {
  constructor(instance) {
    super(instance)
    this.init()
  }

  init() {
    this.$sections.css({
      transition: `${this.second}s transform ${this.options.easing}`
    })
    $('html, body').css({ overflow: 'hidden' })

    this.get3DPosition()
    this.initSection()
  }

  changePage() {
    const index = this.instance.currIndex - 1
    let i = 0
    const that = this

    this.$sections.each(function() {
      if (index > i) {
        const translate3d = `translate3d(${that.position[0].x}, ${
          that.position[0].y
        }, 0px)`
        $(this).css({ transform: translate3d })
      } else {
        const translate3d = `translate3d(${that.position[1].x}, ${
          that.position[1].y
        }, 0px)`
        $(this).css({ transform: translate3d })
      }
      i++
    })

    super.changePage()
  }

  //
  // destroy() {
  // }

  initSection() {
    let i = 0
    const that = this
    this.$sections.each(function() {
      const index = Math.abs(i - that.$sections.length)
      $(this).css({
        'z-index': index,
        position: 'absolute'
      })
      i++
    })
  }

  get3DPosition() {
    const stack = [
      {
        x: '0px',
        y: '-100vh'
      },
      {
        x: '0px',
        y: '0px'
      }
    ]

    this.position = stack
  }
}

export default Stack
