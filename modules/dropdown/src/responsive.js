import { addClass } from '@pluginjs/classes'
import { append } from '@pluginjs/dom'
import Breakpoints from '@pluginjs/breakpoints'

class Responsive {
  constructor(instance) {
    this.instance = instance
    this.$fadeIn = this.instance.$fadeIn
    this.initialize()
  }

  initialize() {
    const options = this.instance.options

    if (options.responsiveFull === false) {
      return
    }

    this.initBreakpoints()
    if (Breakpoints.is('xs-')) {
      this.instance.enter('responsive')
      append(this.$fadeIn, this.instance.$dropdown.parentNode)
      append(this.instance.$dropdown, this.$fadeIn)
    }
  }

  initBreakpoints() {
    Breakpoints.init()
    Breakpoints.define(this.instance.options.breakpoints)
    const that = this
    Breakpoints.to('xs', {
      enter() {
        that.instance.enter('responsive')
        if (that.instance.POPPER) {
          that.instance.POPPER.destroy()
          that.instance.leave('popper')
        }

        append(that.$fadeIn, that.instance.$dropdown.parentNode)
        append(that.instance.$dropdown, that.$fadeIn)

        if (that.instance.$dropdown.classList.contains('pj-dropdown-show')) {
          addClass(that.instance.classes.SHOW, that.$fadeIn)
        }
      },
      leave() {
        that.instance.leave('responsive')
        that.$fadeIn.classList.remove('pj-dropdown-show')
        append(that.instance.$dropdown, that.$fadeIn.parentNode)
        that.$fadeIn.parentNode.removeChild(that.$fadeIn)
        if (that.instance.$dropdown.classList.contains('pj-dropdown-show')) {
          that.instance.setupPopper()
        }
      }
    })
  }
}

export default Responsive
