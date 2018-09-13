import { isNumber } from '@pluginjs/is'
import Hammer from 'hammerjs'
import anime from 'animejs'
import { compose } from '@pluginjs/utils'
import { addClass, removeClass, toggleClass } from '@pluginjs/classes'
import { setStyle, outerHeight } from '@pluginjs/styled'
import Breakpoints from '@pluginjs/breakpoints'
import {
  empty,
  append,
  parent,
  closest,
  parseHTML,
  html,
  insertBefore,
  removeAttr,
  children,
  query
} from '@pluginjs/dom'

class Responsive {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.index = isNumber(this.instance.current[0])
      ? this.instance.current[0]
      : 0
    this.duration = parseInt(this.instance.options.responsiveDuration, 10)

    const options = this.instance.options

    if (options.breakpoint === false || options.breakpoint === null) {
      return
    }

    this.initBreakpoints()

    // init status
    this.$rely = window.document.documentElement
    if (options.resizeReference === 'self') {
      this.$rely = this.instance.element
    } else if (
      options.resizeReference !== 'window' &&
      /* eslint no-magic-numbers: ["error", { "ignore": [0] }]*/
      query(options.resizeReference).length > 0
    ) {
      this.$rely = query(options.resizeReference)
    }

    this.effects = {
      in: options.responsiveEffect,
      out: this.revertClass(options.responsiveEffect)
    }

    if (Breakpoints.is(`${this.breakpoint}-`)) {
      this.toggle(true)
    }
  }

  initBreakpoints() {
    Breakpoints.init()
    this.breakpoint = this.instance.options.breakpoint
    const that = this
    Breakpoints.to(that.breakpoint, {
      enter() {
        that.resetHeight(true)
        that.toggle(true)
      },
      leave() {
        that.toggle(false)
      }
    })
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

  initDistance() {
    const direction = this.instance.options.horizontal ? 'width' : 'height'
    this.instance.$panes.map($pane =>
      setStyle(
        {
          transform: 'translateY(-50%)',
          opacity: '0',
          [direction]: 'auto'
        },
        $pane
      )
    )

    this.instance.$contentInners.map($item =>
      setStyle(direction, 'auto', $item)
    )

    setStyle(
      'height',
      outerHeight(this.instance.$contentInners[this.index]),
      this.instance.element
    )
  }

  toggle(toBuild) {
    if (toBuild) {
      this.build()
    } else {
      this.destroy()
    }
  }

  build() {
    if (this.instance.is('built')) {
      return
    }

    if (this.instance.current.length === 0) {
      this.instance.current = [0]
    }

    this.initDistance()

    const classes = this.instance.classes
    const options = this.instance.options

    this.$dropdown = parseHTML(`<div class="${classes.DROPDOWN}"></div>`)
    this.$dropdownlabel = compose(
      append(this.instance.$headers[this.instance.current[0]].innerHTML),
      empty,
      addClass(classes.DROPDOWNLABEL),
      parseHTML
    )(options.dropdownLabelTpl)
    this.$dropdownList = parseHTML(`<ul class="${classes.DROPDOWNLIST}"></ul>`)
    this.$dropdownItems = Array.from(Array(this.instance.size), (_, index) => {
      const $li = parseHTML(
        `<li>${this.instance.$headers[index].innerHTML}</li>`
      )
      if (index === this.instance.current[0]) {
        addClass(classes.ACTIVE, $li)
      }
      return $li
    })
    this.$dropdownList.append(...this.$dropdownItems)
    if (this.instance.options.theme) {
      addClass(this.instance.getThemeClass(), this.$dropdown)
    }
    const insertBeforeInstanceElement = dropdown =>
      compose(
        insertBefore(dropdown),
        addClass(classes.RESPONSIVE)
      )(this.instance.element)
    compose(
      insertBeforeInstanceElement,
      append(this.$dropdownList),
      append(this.$dropdownlabel)
    )(this.$dropdown)

    this.bind()

    this.instance.enter('built')

    if (this.instance.is('initialized')) {
      this.instance.open(this.instance.current[0], false)
    }
  }

  destroy() {
    if (!this.instance.is('built')) {
      return
    }

    this.$dropdown.remove()
    this.instance.$panes.map(removeAttr('style'))
    compose(
      removeClass(this.instance.classes.RESPONSIVE),
      removeAttr('style')
    )(this.instance.element)

    this.unbind()

    this.instance.leave('built')
    for (let i = 0; i < this.instance.$panes.length; i++) {
      this.instance.close(i, false)
    }

    this.instance.open(this.index, false)
  }

  bind() {
    this.dropdown = new Hammer(this.$dropdown)
    this.dropdown.on('tap', e => {
      if (this.instance.is('disabled')) {
        return
      }
      const { target } = e
      const aTag = target.tagName === 'A' ? target : closest('A', target)
      const liTag = target.tagName === 'LI' ? target : closest('LI', target)
      if (aTag) {
        this.switch()
      } else if (liTag) {
        this.labelActive(children(parent(liTag)).indexOf(liTag))
      }
    })
  }

  unbind() {
    this.dropdown.destroy()
  }

  switch() {
    toggleClass(this.instance.classes.DROPDOWNOPEN, this.$dropdown)
  }

  labelActive(index) {
    this.index = index
    const BASE_INDEX = -1

    if (this.instance.current.indexOf(index) !== BASE_INDEX) {
      removeClass(this.instance.classes.DROPDOWNOPEN, this.$dropdown)
      return
    }

    this.instance.toggle(index)

    removeClass(
      this.instance.classes.ACTIVE,
      this.$dropdownItems[this.instance.prev[0]]
    )
    addClass(this.instance.classes.ACTIVE, this.$dropdownItems[index])
    html(this.$dropdownItems[index].innerHTML, this.$dropdownlabel)
    removeClass(this.instance.classes.DROPDOWNOPEN, this.$dropdown)
  }

  open(index, trigger) {
    this.index = index

    const BASE_DURATION = 1
    const $pane = this.instance.$panes[index]
    anime({
      targets: $pane,
      translateY: 0,
      opacity: 1,
      duration: trigger ? this.duration : BASE_DURATION,
      easing: this.effects.in,
      begin: () => {
        addClass(this.instance.classes.ACTIVE, $pane)
      }
    })

    this.resetHeight(!trigger)
  }

  close(index, trigger) {
    const pane = this.instance.$panes[this.instance.prev[0]]
    const BASE_DURATION = 1
    anime({
      targets: pane,
      translateY: '50%',
      opacity: 0,
      duration: trigger ? this.duration : BASE_DURATION,
      easing: this.effects.out,
      complete: () => {
        setStyle('transform', 'translateY(-50%)', pane)
        removeClass(this.instance.classes.ACTIVE, pane)
      }
    })
  }

  resetHeight(immediately = false) {
    if (!this.instance.is('built')) {
      return
    }

    const innerHeight = outerHeight(this.instance.$contentInners[this.index])
    if (immediately) {
      setStyle('height', innerHeight, this.instance.element)
    } else {
      anime({
        targets: this.instance.element,
        height: innerHeight,
        duration: this.duration,
        easing: 'linear'
      })
    }
  }
}
export default Responsive
