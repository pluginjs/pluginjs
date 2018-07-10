export const namespace = 'hotspots'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  HOVER: 'hover',
  HOVERED: 'hovered',
  HOTSPOTHOVER: 'hotspotHover',
  HOTSPOTHOVERED: 'hotspotHovered',
  POPOVERSHOW: 'popoverShow',
  POPOVERSHOWN: 'popoverShown',
  POPOVERINSERTED: 'popoverInserted',
  POPOVERHIDE: 'popoverHide',
  POPOVERHIDDEN: 'popoverHidden'
}

export const classes = {
  NAMESPACE: 'pj-hotspot',
  CONTAINER: '{namespace}s',
  HOVERING: '{namespace}s-hovering',
  DISABLED: '{namespace}s-disabled',
  HOTSPOT: '{namespace}',
  THEME: '{namespace}--{theme}',
  TYPE: '{namespace}-{type}',
  SKIN: '{namespace}-{skin}',
  DOT: '{namespace}-dot',
  ICON: '{namespace}-icon',
  TEXT: '{namespace}-text',
  HOTSPOTHOVERING: '{namespace}-hovering',
  HOTSPOTACTIVE: '{namespace}-active'
}

export const methods = ['value', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  data: [],
  popover: {
    placement: 'top',
    trigger: 'hover focus', // hover focus, click, manual
    hideOutClick: true, // When clicking outside of the tooltip, trigger hide event
    delay: 0, // { "show": 500, "hide": 100 }
    close: false,
    html: true
  },
  type: 'dot', // dot, icon, text, number, hide
  icon: '',
  templates: {
    hotspot() {
      return '<div title="{title}" data-content="{content}" class="{classes.HOTSPOT} {skin} {type}" style="{styles}" {options}>{label}</div>'
    },
    icon() {
      return '<span class="{icon}"></span>'
    },
    text() {
      return '{text}'
    },
    number() {
      return '{number}'
    },
    dot() {
      return ''
    }
  }
}

export const dependencies = ['tooltip', 'popover']

export const info = { version: '0.0.1' }
