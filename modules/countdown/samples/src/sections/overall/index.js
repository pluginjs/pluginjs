import { query } from '@pluginjs/dom'
import CountDown from '@pluginjs/countdown'

const element = query('#overall .example')
CountDown.of(element, {
  overall: true,
  format: 'TD,H,M,S',
  templates: {
    custom() {
      return '{totalDays} Days {hours}:{minutes}:{seconds}'
    }
  },
  onUpdate() {
    const html = this.getHtml('custom', {
      totalDays: this.times.totalDays,
      hours: this.times.hours,
      minutes: this.times.minutes,
      seconds: this.times.seconds
    })

    this.element.innerHTML = html
  }
})
