import is from '@pluginjs/is'

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
  INNER: '{namespace}-inner',
  ITEM: '{namespace}-item',
  MARGINTOP: '{namespace}-marginTop',
  MARGINBOTTOM: '{namespace}-marginBottom',
  MARGINLEFT: '{namespace}-marginLeft',
  MARGINRIGHT: '{namespace}-marginRight',
  PADDINGTOP: '{namespace}-paddingTop',
  PADDINGBOTTOM: '{namespace}-paddingBottom',
  PADDINGLEFT: '{namespace}-paddingLeft',
  PADDINGRIGHT: '{namespace}-paddingRight',
  VIEW: '{namespace}-view',
  UNITSHOW: '{namespace}-unit-show',
  CONNECT: '{namespace}-connect',
  CONNECTLINK: '{namespace}-connect-link',
  CONNECTUNLINK: '{namespace}-connect-unlink',
  CONNECTACTIVE: '{namespace}-connect-active'
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
  template() {
    return `<div class="{namespace}-wrap">
            <div class="{namespace}-inner">
              <div class="{namespace}-item {namespace}-marginTop">
                <label for="marginTop"><i class="icon-padding-up"></i></label>
                <input id="marginTop" type="text" value="0">
                <span class="{view}" data-value="marginTop"></span>
              </div>
              <div class="{namespace}-item {namespace}-marginRight">
                <label for="marginRight"><i class="icon-padding-right"></i></label>
                <input id="marginRight" type="text" value="0">
                <span class="{view}" data-value="marginRight"></span>
              </div>
              <div class="{namespace}-item {namespace}-marginBottom">
                <label for="marginBottom"><i class="icon-padding-bottom"></i></label>
                <input id="marginBottom" type="text" value="0">
                <span class="{view}" data-value="marginBottom"></span>
              </div>
              <div class="{namespace}-item {namespace}-marginLeft">
                <label for="marginLeft"><i class="icon-padding-left"></i></label>
                <input id="marginLeft" type="text" value="0">
                <span class="{view}" data-value="marginLeft"></span>
              </div>
              <div class="{namespace}-item {namespace}-paddingTop">
                <label for="paddingTop"><i class="icon-padding-up"></i></label>
                <input id="paddingTop" type="text" value="0">
                <span class="{view}" data-value="paddingTop"></span>
              </div>
              <div class="{namespace}-item {namespace}-paddingRight">
                <label for="paddingRight"><i class="icon-padding-right"></i></label>
                <input id="paddingRight" type="text" value="0">
                <span class="{view}" data-value="paddingRight"></span>
              </div>
              <div class="{namespace}-item {namespace}-paddingBottom">
                <label for="paddingBottom"><i class="icon-padding-bottom"></i></label>
                <input id="paddingBottom" type="text" value="0">
                <span class="{view}" data-value="paddingBottom"></span>
              </div>
              <div class="{namespace}-item {namespace}-paddingLeft">
                <label for="paddingLeft"><i class="icon-padding-left"></i></label>
                <input id="paddingLeft" type="text" value="0">
                <span class="{view}" data-value="paddingLeft"></span>
              </div>
              <div class="{namespace}-connect">
                <i class='{namespace}-connect-link icon-link'></i>
                <i class="{namespace}-connect-unlink icon-unlink"></i>
              </div>
            </div>
          </div>`
  },
  defaultUnit: 'px',
  data: null, // default data
  min: -1000,
  max: 1000,

  process(value) {
    if (value && !is.undefined(value)) {
      return JSON.stringify(value)
    }
    return ''
  },

  parse(value) {
    if (value) {
      try {
        return JSON.parse(value.replace(/\'/g, '"'))
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

export const info = { version: '0.1.0' }
