export const namespace = 'timeTable'

export const events = {
  ENABLE: 'enable',
  EDITABLE: 'editable',
  CLICK: 'click',
  DETAIL: 'detail'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  INIT: '{namespace}-init',
  DETAIL: '{namespace}-month-detail',
  ACTIVE: '{namespace}-active',
  THEME: '{namespace}--{theme}',
  DISABLED: '{namespace}-disabled',
  DATA: '{namespace}-data',
  WEBVIEW: '{namespace}-webview',
  DATEPICKER: '{namespace}-datePicker',
  // WEEK: '{namespace}-week',
  BASELINE: '{namespace}-baseline',
  EVENTWRAP: '{namespace}-event-wrap',
  AFFAIR: '{namespace}-affair',
  OTHERMONTH: '{namespace}-other-badge',

  // classifier
  CLASSIFY: '{namespace}-classify',
  ITEM: '{namespace}-classify-item',
  // Controller
  TEXT: '{namespace}-controller-text',
  CONTROL: '{namespace}-controller',
  ARROW: '{namespace}-arrow',
  PREVIEW: '{namespace}-controller-preview',
  NEXT: '{namespace}-controller-next',
  // view
  VIEW: '{namespace}-view',
  HIDE: '{namespace}-hide',
  // WEEK: '{namespace}-weekly',
  MONTH: '{namespace}-monthly',
  LIST: '{namespace}-listly',
  // weekly
  HEADER: '{namespace}-header',
  EDIT: '{namespace}-edit',
  EVENTSGROUP: '{namespace}-events-group',
  EVENTS: '{namespace}-events',
  WEEKEVENT: '{namespace}-weekEvent',
  WEEKEVENTTIME: '{namespace}-weekEvent-time',
  WEEKEVENTTITLE: '{namespace}-weekEvent-title',
  ACTIVEWEEKEVENT: '{namespace}-weekEvent-active',
  WEEKEVENTWRAP: '{namespace}-weekEvent-wrap',
  // monthly
  OVERLAY: '{namespace}-overlay',
  SMOVERLAY: '{namespace}-sm-overlay',
  MONTHEVENT: '{namespace}-monthly-event',
  MONTHEVENTSWRAP: '{namespace}-monthEvents-wrap',
  MONTHEVENTWRAP: '{namespace}-month-eventwrap',
  MONTHSHOWLIST: '{namespace}-month-showList',
  MONTHSINGLEEVENT: '{namespace}-month-singleEvent',
  BADGE: '{namespace}-badge',
  MONTHEVENTMORE: '{namespace}-monthEvent-more',
  MONTHEVENTTIME: '{namespace}-monthEvent-time',
  MONTHEVENTTITLE: '{namespace}-monthEvent-title',
  HIGHHEIGHT: '{namespace}-high-height',
  // list
  LISTEVENTWRAP: '{namespace}-listEvent-wrap',
  LISTEVENTHEAD: '{namespace}-listEvent-head',
  LISTEVENTITEM: '{namespace}-listEvent-item',
  LISTEVENTTIME: '{namespace}-listEvent-time',
  LISTEVENTTITLE: '{namespace}-listEvent-title',
  LISTEVENTCONTENT: '{namespace}-listEvent-content',
  LISTEVENTITEMWRAP: '{namespace}-listEvent-item-wrap'
}

export const methods = [
  'get',
  'set',
  'val',
  'enable',
  'disable',
  'changeView',
  'destroy'
]

export const defaults = {
  locale: 'en',
  data: null,
  view: 'monthly',
  templates: {
    classifier() {
      return `
          <div class="{class}">
          </div>
        `
    },
    controller() {
      return `<div class="{class}">
                <div class="{arrowClass} {previewClass} pj-arrow-icon icon-chevron-left"></div>
                <span class="{textClass}"></span>
                <div class="{arrowClass} {nextClass} pj-arrow-icon icon-chevron-right"></div>
              </div>`
    },
    weekEvent() {
      return `<div class="{class.WEEKEVENT}">
          <div class="{class.WEEKEVENTWRAP}">
            <div class="{class.WEEKEVENTTITLE}"></div>
            <div class="{class.WEEKEVENTTIME}"></div>
          </div>
        </div>`
    },
    monthEvent() {
      return `<div class="{class.MONTHEVENTWRAP}">
          <span></span>
          <div class="{class.MONTHEVENTTIME}">{data.timeBucket}</div>
          <div class="{class.MONTHEVENTTITLE}">{data.title}</div>
        </div>`
    },
    eventsWrap() {
      return `<div class="{class.MONTHEVENTSWRAP}">
      </div>`
    },
    more() {
      return `<div class="{class.MONTHEVENTMORE}">
      </div>`
    },
    listEvent() {
      return `<div class="{class.LISTEVENTWRAP}">
          <div class="{class.LISTEVENTHEAD}"></div>
        </div>`
    },
    listEventItem() {
      return `<div class="{class.LISTEVENTITEM}">
          <div class="{class.LISTEVENTTIME}">{data.timeBucket}</div>
          <div class="{class.LISTEVENTITEMWRAP}">
            <div class="{class.LISTEVENTTITLE}">{data.title}</div>
            <div class="{class.LISTEVENTCONTENT}">{data.content}</div>
          </div>
        </div>`
    }
  },
  listly: {
    controllerLabel: ['DD MMM', '- DD MMM ,YYYY'],
    headerLabel: 'MMMM DD, YYYY',
    eventLabel: ['HH:mm', '-HH:mm']
  },
  weekly: {
    controllerLabel: ['MMM DD ', '- MMM DD, YYYY'],
    headerLabel: 'ddd,DD MMM',
    timeBetween: '09:00-19:30'
  },
  monthly: {
    controllerLabel: 'MMM YYYY',
    eventLabel: 'HH:mm'
  }
}

export const translations = {
  en: {
    weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    month: {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12
    },
    fullWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    fullMonth: {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      'June ': 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    },
    choice: {
      week: 'Week',
      month: 'Month'
    },
    today: 'today',
    add: 'ADD EVENT',
    all: 'All Classes'
  },
  zh: {
    weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    month: {
      一月: 1,
      二月: 2,
      三月: 3,
      四月: 4,
      五月: 5,
      六月: 6,
      七月: 7,
      八月: 8,
      九月: 9,
      十月: 10,
      十一月: 11,
      十二月: 12
    },
    fullWeek: [
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
      '星期日'
    ],
    fullMonth: {
      一月: 1,
      二月: 2,
      三月: 3,
      四月: 4,
      五月: 5,
      六月: 6,
      七月: 7,
      八月: 8,
      九月: 9,
      十月: 10,
      十一月: 11,
      十二月: 12
    },
    choice: {
      week: '周视图',
      month: '月视图'
    },
    today: '今日',
    add: '添加事项',
    all: '全部'
  }
}

export const dependencies = ['filters']
