export const namespace = 'datePicker'

export const events = {
  CHANGE: 'change',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  BEFORESHOW: 'beforeShow',
  BEFOREHIDE: 'beforeHide',
  SHOW: 'show',
  HIDE: 'hide'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  INPUT: '{namespace}-input',
  DISABLED: '{namespace}-disabled',
  ICON: '{namespace}-icon',
  COVER: '{namespace}-cover',
  ISMOBILE: '{namespace}-isMobile',
  CONTENT: '{namespace}-content',
  PREV: '{namespace}-prev',
  NEXT: '{namespace}-next',
  CAPTION: '{namespace}-caption',
  DATS: '{namespace}-days',
  MONTHS: '{namespace}-months',
  YEARS: '{namespace}-years',
  ISDAYS: '{namespace}-isDays',
  ISMONTHS: '{namespace}-isMonths',
  ISYEARS: '{namespace}-isYears',
  OTHERMONTH: '{namespace}-otherMonth',
  OTHERYEAR: '{namespace}-otherYear',
  FOCUS: '{namespace}-focus',
  BUTTONS: '{namespace}-buttons',
  BUTTONCANCELS: '{namespace}-button-cancel',
  BUTTONSAVES: '{namespace}-button-save',
  SHOW: '{namespace}-show',
  HEAD: '{namespace}-head',
  HEADER: '{namespace}-header',
  BODY: '{namespace}-body',
  ROW: '{namespace}-row',
  BLOCKED: '{namespace}-blocked',
  UNTOUCHABLE: '{namespace}-untouchable',
  INRANGE: '{namespace}-inRange',
  ACTIVE: '{namespace}-active',
  INLINEMODE: '{namespace}-inline',
  DROPDOWN: '{namespace}-dropdown',
  INPUTMODE: 'pj-input',
  WRAP: '{namespace}-wrap',
  INPUTWRAP: '{namespace}',
  TITLE: '{namespace}-title',
  STARTDAY: '{namespace}-startDay',
  ENDDAY: '{namespace}-endDay',
  LASTMONTH: '{namespace}-select-last-in-month',
  FIRSTMONTH: '{namespace}-select-first-in-month',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  SELECTED: '{namespace}-selected'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'update',
  'reset',
  'multipleClear',
  'getInput',
  'getDate',
  'getWrap',
  'show',
  'hide',
  'get',
  'set',
  'val'
]

export const defaults = {
  theme: null,
  firstDayOfWeek: 0, // 0-6 === sunday---saturday
  mode: 'single', // single,range,multiple
  inline: false,
  calendars: 1,
  date: 'today', // today|Date (yyyy-mm-dd)
  keyboard: true, // true | false
  rangeSeparator: '-',
  multipleSeparator: ',',
  multipleSize: 5,
  disabled: false,
  clearable: false,
  alwaysShow: false, // true or false
  onceClick: false, // true or false

  min: null, // min: '2012-12-1',//null|'today'|days|Date with (yyyy-mm-dd)
  max: null, // max: '2013-10-1',//null|'today'|days|Date with (yyyy-mm-dd)

  selectableDate: [], // ['2013-8-1', {from: '2013-8-5', -: '2013-8-10'}, {from: -30, -: 30}]],
  selectableYear: [], // [{from: 1980, -: 1985}, 1988, {from: 2000, -: 2010}, 2013],
  selectableMonth: [], // months from 0 - 11 (jan - dec) example: [0, {from: 3, -: 9}, 11],
  selectableDay: [], // days from 0 - 31,

  selectableDayOfWeek: [], // days of week 0-6 (su - sa) [0, {from: 2, -: 4}] , [] is default all

  locale: 'en',
  localeFallbacks: true,
  views: ['days'], // ['days'], ['days', 'months', 'years']
  outputFormat: 'yyyy/mm/dd',

  prevIcon: 'pj-icon pj-icon-arrow-left',
  nextIcon: 'pj-icon pj-icon-arrow-right',

  templates: {
    inputWrap() {
      return '<div class="{classes.INPUTWRAP}"><div class="pj-input-group"></div></div>'
    },
    inputIcon() {
      return '<div class="pj-input-group-addon {classes.ICON}"><i class="pj-icon pj-icon-calendar"></i></div>'
    },
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    },
    content() {
      return (
        '<div class="{classes.CONTENT}">' +
        '<div class="{classes.HEADER}">' +
        '<div class="{classes.CAPTION}"></div>' +
        '<div class="{classes.PREV}"></div>' +
        '<div class="{classes.NEXT}"></div>' +
        '</div>' +
        '<div class="{classes.DATS}"></div>' +
        '<div class="{classes.MONTHS}"></div>' +
        '<div class="{classes.YEARS}"></div>' +
        '<div class="{classes.BUTTONS}">' +
        '<div class="{classes.BUTTONCANCELS}"></div>' +
        '<div class="{classes.BUTTONSAVES}"></div>' +
        '</div>' +
        '</div>'
      )
    },
    title() {
      return '<div class="{classes.TITLE}">test</div>'
    }
  },

  process(value) {
    if (value && typeof value !== 'undefined') {
      return JSON.stringify(value)
    }
    return ''
  },

  parse(value) {
    if (value) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return null
      }
    }
    return null
  }
}

export const translations = {
  en: {
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    daysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    buttons: ['Cancel', 'Save']
  },
  zh: {
    days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    daysShort: ['日', '一', '二', '三', '四', '五', '六', '日'],
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    monthsShort: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12'
    ],
    buttons: ['取消', '保存']
  }
}

export const dependencies = ['Hammer', 'Popper']
