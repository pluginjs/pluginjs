import { deepMerge } from '@pluginjs/utils'
import templateEngine from '@pluginjs/template'
import { query, append, prepend, parseHTML } from '@pluginjs/dom'
import is from '@pluginjs/is'
import { updateDomValue } from '../util'
import { labelMap as LABELMAP } from '../constant'

class Flip {
  constructor(instance) {
    this.options = deepMerge(Flip.defaults, instance.options.modes.flip)

    this.lastTime = []
    this.currenTime = []

    this.instance = instance
  }

  html(type, getLabel) {
    const flip = []
    const label = []

    let $flip
    let $label

    flip[type] = templateEngine.render(this.options.template.call(this), {
      classes: this.instance.classes,
      flipClass: this.options.flipClass,
      labelType: getLabel.labelMap
    })

    label[type] = templateEngine.render(
      this.instance.options.templates.label(),
      {
        classes: this.instance.classes,
        text: getLabel.labelName
      }
    )

    for (type in flip) {
      if (Object.prototype.hasOwnProperty.call(flip, type)) {
        $flip = parseHTML(flip[type])
        $label = parseHTML(label[type])

        if (this.instance.options.site === 'above') {
          $label.classList.add(this.instance.getClass('above'))
          prepend($label, $flip)
        } else {
          append($label, $flip)
        }

        append($flip, this.instance.element)
      }
    }
  }

  animate(countDownTime, type) {
    // about flip time
    const name = LABELMAP[type]

    this.currenTime[type] = countDownTime.current

    this.setFlipAnimation(`.${name}`)

    if (!is.undefined(this.lastTime[type])) {
      updateDomValue(
        `.${this.options.flipClass.CURR}.${this.options.flipClass.TOP}.${
          this.instance.classes.NAMESPACE
        }-${name}`,
        this.instance.element,
        this.lastTime[type]
      )

      updateDomValue(
        `.${this.options.flipClass.CURR}.${this.options.flipClass.BOTTOM}.${
          this.instance.classes.NAMESPACE
        }-${name}`,
        this.instance.element,
        this.lastTime[type]
      )
    }

    updateDomValue(
      `.${this.options.flipClass.NEXT}.${this.options.flipClass.TOP}.${
        this.instance.classes.NAMESPACE
      }-${name}`,
      this.instance.element,
      this.currenTime[type]
    )

    updateDomValue(
      `.${this.options.flipClass.NEXT}.${this.options.flipClass.BOTTOM}.${
        this.instance.classes.NAMESPACE
      }-${name}`,
      this.instance.element,
      this.currenTime[type]
    )

    this.lastTime[type] = this.currenTime[type]
  }

  // flip animation
  setFlipAnimation(className) {
    const dom = query(className, this.instance.element)

    if (dom) {
      for (const type in this.lastTime) {
        if (this.lastTime[type] !== this.currenTime[type]) {
          dom.classList.remove(`${this.options.flipClass.FLIP}`)

          setTimeout(() => {
            dom.classList.add(`${this.options.flipClass.FLIP}`)
          }, 50)
        }
      }
    }
  }
}

Flip.defaults = {
  template() {
    return `<div class="{classes.TIME} {labelType}">
                    <span class="{classes.NUMBER} {classes.NAMESPACE}-{labelType} {flipClass.FLIP} {flipClass.CURR} {flipClass.TOP}"></span>
                    <span class="{classes.NUMBER} {classes.NAMESPACE}-{labelType} {flipClass.FLIP} {flipClass.NEXT} {flipClass.TOP}"></span>
                    <span class="{classes.NUMBER} {classes.NAMESPACE}-{labelType} {flipClass.FLIP} {flipClass.NEXT} {flipClass.BOTTOM}"></span>
                    <span class="{classes.NUMBER} {classes.NAMESPACE}-{labelType} {flipClass.FLIP} {flipClass.CURR} {flipClass.BOTTOM}"></span>
                  </div>`
  }
}

Flip.classes = {
  FLIP: '{namespace}-flip'
}

export default Flip
