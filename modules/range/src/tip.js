import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import { appendTo } from '@pluginjs/dom'
import { events as EVENTS } from './constant'

class Tip {
  constructor(instance) {
    const showTip = pointer => {
      addClass(instance.classes.TIPSHOW, pointer.$tip)
    }

    const hideTip = pointer => {
      removeClass(instance.classes.TIPSHOW, pointer.$tip)
    }
    const setContent = pointer => {
      pointer.$tip.innerHTML = instance.options.tipContent.call(
        instance,
        pointer
      )
    }

    instance.pointers.forEach(pointer => {
      pointer.$tip = appendTo(
        `<span class="${instance.classes.TIP}"></span>`,
        pointer.element
      )

      setContent(pointer)

      if (instance.options.tip === true || instance.options.tip === 'always') {
        showTip(pointer)
      }
    })

    if (instance.options.tip === 'move') {
      bindEvent(
        instance.selfEventName(EVENTS.POINTERACTIVE),
        (e, instance, pointer) => {
          showTip(pointer)
          return false
        },
        instance.element
      )

      bindEvent(
        instance.selfEventName(EVENTS.POINTERDEACTIVE),
        (e, instance, pointer) => {
          hideTip(pointer)
          return false
        },
        instance.element
      )
    }

    bindEvent(
      instance.selfEventName(EVENTS.POINTERUPDATE),
      (e, instance, pointer) => {
        setContent(pointer)
      },
      instance.element
    )
  }
}

export default Tip
