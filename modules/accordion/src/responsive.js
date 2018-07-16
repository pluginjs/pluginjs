import is from '@pluginjs/is'
import Hammer from 'hammerjs'
import anime from 'animejs'
import { compose } from '@pluginjs/utils'
import { addClass, removeClass, toggleClass } from '@pluginjs/classes'
import { setStyle, outerHeight } from '@pluginjs/styled'
import {
  empty,
  append,
  parent,
  parentWith,
  parseHTML,
  html,
  insertBefore,
  removeAttribute,
  remove,
  children,
  query
} from '@pluginjs/dom'

class Responsive {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.index = is.number(this.instance.current[0])
      ? this.instance.current[0]
      : 0
    this.duration = parseInt(this.instance.options.responsiveDuration, 10)

    const options = this.instance.options

    if (options.breakWidth === false || options.breakWidth === null) {
      return
    }

    // init status
    this.$rely = window
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

    if (!(this.$rely.clientWidth > options.breakWidth)) {
      this.toggle(true)
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

  initDistance() {
    const direction = this.instance.options.horizontal ? 'width' : 'height'
    this.instance.$panes.map(
      setStyle({
        transform: 'translateY(-50%)',
        opacity: '0',
        [direction]: 'auto'
      })
    )

    this.instance.$contentInners.map(setStyle({ [direction]: 'auto' }))

    setStyle(
      { height: `${outerHeight(this.instance.$contentInners[this.index])}px` },
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

    this.$dropdown.map(remove)
    this.instance.$panes.map(removeAttribute('style'))
    compose(
      removeClass(this.instance.classes.RESPONSIVE),
      removeAttribute('style')
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
      const matchTagName = tagName => el => el.tagName === tagName
      const aTag =
        target.tagName === 'A' ? target : parentWith(matchTagName('A'), target)
      const liTag =
        target.tagName === 'LI'
          ? target
          : parentWith(matchTagName('LI'), target)
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
    const magicNumber = 1
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
      complete: () =>
        compose(
          setStyle({ transform: 'translateY(-50%)' }),
          removeClass(this.instance.classes.ACTIVE)
        )(pane)
    })
  }

  resetHeight(immediately = false) {
    if (!this.instance.is('built')) {
      return
    }

    const innerHeight = outerHeight(this.instance.$contentInners[this.index])
    if (immediately) {
      setStyle({ height: `${innerHeight}px` }, this.instance.element)
    } else {
      anime({
        targets: this.instance.element,
        height: innerHeight,
        duration: this.duration,
        easing: 'linear'
      })
    }
  }

  resize() {
    const breakWidth = this.instance.options.breakWidth

    if (breakWidth === false || breakWidth === null) {
      return
    }

    if (this.$rely.width() > breakWidth) {
      this.toggle(false)
    } else {
      this.resetHeight(true)
      this.toggle(true)
    }
  }
}
export default Responsive
