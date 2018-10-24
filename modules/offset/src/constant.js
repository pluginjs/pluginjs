export const namespace = 'offset'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  CONNECTLINK: '{namespace}-connect-link',
  CONNECTUNLINK: '{namespace}-connect-unlink',
  WRAP: '{namespace}-wrap',
  INPUT: '{namespace}-input',
  HAHA: '{namespace}-haha',
  ALLREVERSE: '{namespace}-allreverse',
  TOP: '{namespace}-top',
  RIGHT: '{namespace}-right',
  BOTTOM: '{namespace}-bottom',
  LEFT: '{namespace}-left',
  LOCK: '{namespace}-lock',
  LOCKACTIVE: '{namespace}-lock-active',
  SELECT: '{namespace}-select',
  SELECTTRIGGER: '{namespace}-select-trigger',
  REVERSELABEL: '{namespace}-reverse-label',
  REVERSE: '{namespace}-reverse'
}

export const methods = [
  'get',
  'set',
  'val',
  'move',
  'enable',
  'disable',
  'destroy',
  'clear'
]

export const defaults = {
  locale: 'en',
  source: [
    {
      value: 'px',
      label: 'px'
    },
    {
      value: 'pt',
      label: 'pt'
    },
    {
      value: 'em',
      label: 'em'
    },
    {
      value: 'rem',
      label: 'rem'
    },
    {
      value: '%',
      label: '%'
    }
  ],
  template() {
    return `<div class="{classes.WRAP}">         
                <div class="{classes.ALLREVERSE}">
                   <div class="{classes.REVERSE} ">
                    <input id="top" class="{classes.TOP} {classes.INPUT}" type="number" value="">
                    <div class="{classes.REVERSELABEL}" >TOP</div>
                   </div>
                   <div class="{classes.REVERSE}">
                    <input id="right" class="{classes.RIGHT} {classes.INPUT}" type="number" value="">
                    <div class="{classes.REVERSELABEL}" >RIGHT</div>
                   </div>
                   <div class="{classes.REVERSE}">
                    <input id="bottom" class="{classes.BOTTOM} {classes.INPUT}" type="number" value="">
                    <div class="{classes.REVERSELABEL}" >BOTTOM</div>
                   </div>
                   <div class="{classes.REVERSE}">
                    <input id="left" class="{classes.LEFT} {classes.INPUT}" type="number" value="">
                    <div class="{classes.REVERSELABEL}">LEFT</div>
                   </div>
                </div>
                <div class="{classes.LOCK}">
                <i class='{classes.CONNECTLINK} pj-icon pj-icon-lock'></i>
                <i class="{classes.CONNECTUNLINK} pj-icon pj-icon-unlock"></i>
                </div>
                <div class="{classes.SELECT}">
                <input type="text" class="{classes.SELECTTRIGGER}"/>
                </div>
          </div>`
  },
  defaultUnit: 'auto',
  data: null, // default data
  min: -1000,
  max: 1000,

  process(value) {
    if (value && typeof value !== 'undefined') {
      return JSON.stringify(value)
    }
    return ''
  },

  parse(value) {
    if (value) {
      try {
        return JSON.parse(value.replace(/\'/g, '"')) /* eslint-disable-line */
      } catch (e) {
        return {}
      }
    }
    return {}
  }
}

export const dependencies = ['tooltip', 'dropdown', 'units']

export const translations = {
  en: {
    brokenLink: 'Broken Link',
    keepLink: 'Keep Them Constant'
  },
  zh: {
    brokenLink: '解开链接',
    keepLink: '保持链接'
  }
}
