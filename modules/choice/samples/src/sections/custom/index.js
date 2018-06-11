import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Choice from '@pluginjs/choice'

const element = query('.blank-custom', render(html, query('#custom')))
Choice.of(element, {
  value: ['ship', 'plane'],
  overflow: true,
  data: {
    car: {
      icon: 'fa-car',
      label: 'Car'
    },
    ship: {
      icon: 'fa-ship',
      label: 'Ship'
    },
    plane: {
      icon: 'fa-plane',
      label: 'Plane'
    },
    cab: {
      icon: 'fa-cab',
      label: 'Cab'
    },
    subway: {
      icon: 'fa-subway',
      label: 'Subway'
    },
    train: {
      icon: 'fa-train',
      label: 'Train'
    },
    rocket: {
      icon: 'fa-rocket',
      label: 'Rocket'
    }
  },
  templates: {
    item() {
      return '<button class="{classes.ITEM}" data-value="{value}"><i class="fa {item.icon}" aria-hidden="true"></i> {item.label}</button>'
    }
  },
  multiple: true
})
