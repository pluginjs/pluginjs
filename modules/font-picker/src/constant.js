import { search } from '@pluginjs/match'
import { isString } from '@pluginjs/is'

export const namespace = 'fontPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  SELECT: 'select',
  UNSELECT: 'unselect',
  CHANGE: 'change',
  HIDE: 'hide',
  HIDED: 'hided',
  SHOW: 'show',
  SHOWN: 'shown',
  CLEAR: 'clear',
  FILTER: 'filter'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  ELEMENT: '{namespace}-element',
  TRIGGER: '{namespace}-trigger pj-input',
  LABEL: '{namespace}-label',
  WRAP: '{namespace}',
  SHOW: '{namespace}-show',
  DROPDOWN: '{namespace}-dropdown',
  GROUP: '{namespace}-group',
  GROUPLABEL: '{namespace}-group-label',
  GROUPHIDED: '{namespace}-group-hided',
  MAIN: '{namespace}-main',
  SOURCE: '{namespace}-source',
  SOURCEHIDED: '{namespace}-source-hided',
  ITEM: '{namespace}-item pj-dropdown-item',
  SELECTED: '{namespace}-selected',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  FILTERABLE: '{namespace}-filterable',
  FILTER: '{namespace}-filter',
  EMPTY: '{namespace}-empty',
  NOTFOUND: '{namespace}-not-found',
  LOADING: '{namespace}-loading',
  ACTIONS: '{namespace}-actions',
  ACTION: '{namespace}-action',
  MANAGE: '{namespace}-manage',
  SWITCHER: '{namespace}-switcher',
  SWITCHERLABEL: '{namespace}-switcher-label',
  SWITCHERDROPDOWN: '{namespace}-switcher-dropdown'
}

export const methods = [
  'set',
  'get',
  'val',
  'clear',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  source: [
    {
      name: 'system',
      title: 'System',
      icon: 'pj-icon pj-icon-desktop',
      fonts: {
        'Sans Serif': [
          'Arial',
          'Calibri',
          'Century',
          'Tahoma',
          'Trebuchet',
          'Verdana',
          'System Sans'
        ],
        Serif: ['Georgia', 'Palatino', 'Times'],
        Monospaced: ['Courier'],
        Chinese: ['简宋', '繁宋', '简黑', '繁黑', '简楷', '繁楷', '仿宋']
      },
      load($item, fontFamily) {
        const fonts = {
          Arial:
            '"Arial", "Helvetica Neue", "Helvetica", "Nimbus Sans L", "Liberation Sans", "Arimo", "sans-serif"',
          Calibri:
            '"Calibri", "Candara", "Gill Sans", "Gill Sans MT", "DejaVu Sans", "Verdana", "Geneva", "sans-serif"',
          Century:
            '"Century Gothic", "Apple Gothic", "AppleGothic", "URW Gothic L", "Avantgarde", "DejaVu Sans", "Tahoma", "sans-serif"',
          Tahoma:
            '"Tahoma", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Verdana", "Geneva", "sans-serif"',
          Trebuchet:
            '"Trebuchet MS", "Futura", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Tahoma", "sans-serif"',
          Verdana: '"Verdana", "Geneva", "DejaVu Sans", "sans-serif"',
          'System Sans':
            '"-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "sans-serif"',
          // Serif
          Georgia:
            '"Georgia", "Palatino", "Palatino Linotype", "Palatino LT STD", "URW Palladio L", "Book Antiqua", "DejaVu Serif", "serif"',
          Palatino:
            '"Palatino", "Palatino Linotype", "Palatino LT STD", "URW Palladio L", "Book Antiqua", "DejaVu Serif", "Georgia", "serif"',
          Times:
            '"Times New Roman", "TimesNewRoman", "DejaVu Serif", "Liberation Serif", "Tinos", "Times", "serif"',
          // Monospaced
          Courier:
            '"Courier New", "Courier", "Courier 10 Pitch", "Liberation Mono", "Nimbus Mono L", "Cousine", "monospace"',
          // 宋体 serif
          简宋:
            '"Songti SC", "STSong", "华文宋体", "宋体", "SimSun", "新宋体", "NSimSun", "AR PL New Sung", "AR PL SungtiL GB", "serif"',
          繁宋:
            '"LiSong Pro", "Apple LiSung", "新細明體", "PMingLiU", "MingLiU", "AR PL Mingti2L", "TW-Sung", "serif"',
          // 黑体 sans-serif
          简黑:
            '"Heiti SC", "Microsoft YaHei New", "Microsoft Yahei", "微软雅黑", "SimHei", "黑体", "STHeiti Light", "STXihei", "华文细黑", "STHeiti", "华文黑体", "WenQuanYi Zen Hei", "sans-serif"',
          繁黑: '"Heiti TC", "Microsoft JhengHei", "微軟正黑體", "sans-serif"',
          // 楷体
          简楷:
            '"Kaiti SC", "KaiTi", "楷体", "STKaiti", "华文楷体", "Kai", "AR PL UKai CN", "serif"',
          繁楷:
            '"BiauKai", "DFKai-SB", "AR PL KaitiM", "AR PL KaitiM GB", "AR PL UKai HK", "AR PL UKai TW", "TW-Kai", "serif"',
          // 仿宋
          仿宋:
            '"FangSong", "Fang Song", "仿宋", "STFangSong", "华文仿宋", "serif"'
        }

        $item.style.fontFamily = fonts[fontFamily]
      }
    }
  ],
  value: null,
  placeholder: true,
  clearable: true,
  manage: null,
  multiple: false,
  filterable: true,
  filter(item, query) {
    return search(query, item, {
      diacritics: false,
      punctuation: false,
      case: false,
      whitespaces: false,
      boundaries: false
    })
  },
  keyboard: true,
  dropdown: {
    placement: 'bottom' // top
  },
  tooltip: {
    trigger: 'hover'
  },
  templates: {
    dropdown() {
      return '<div class="{classes.DROPDOWN}"><div class="{classes.MAIN}"></div></div>'
    },
    filter() {
      return '<div class="{classes.FILTER}"><input type="text" autocomplete="off" spellcheck="false" placeholder="{placeholder}"></div>'
    },
    switcher() {
      return '<div class="{classes.SWITCHER} {classes.ACTION}"><div class="{classes.SWITCHERLABEL}">{label}</div><div class="{classes.SWITCHERDROPDOWN}"></div></div>'
    },
    switcherLabel() {
      return '<i class="{source.icon}"></i> <span>{source.title}</span>'
    },
    manage() {
      return '<div class="{classes.MANAGE} {classes.ACTION}">{text}</div>'
    },
    label() {
      return '<div class="{classes.LABEL}">{placeholder}</div>'
    },
    source() {
      return '<div class="{classes.SOURCE}" data-name="{source.name}"></div>'
    },
    group() {
      return '<div class="{classes.GROUP}"><div class="{classes.GROUPLABEL}">{group}</div></div>'
    },
    item() {
      return '<div class="{classes.ITEM}" data-source="{source.name}" data-value="{font}">{font}</div>'
    },
    selected() {
      return '<i class="{source.icon}"></i> <span>{value}</span>'
    }
  },
  parse(data) {
    if (isString(data)) {
      try {
        return JSON.parse(data)
      } catch (e) {
        return null
      }
    }
    return null
  },
  process(data) {
    if (data && typeof data !== 'undefined' && data.length !== 0) {
      return JSON.stringify(data)
    }
    return ''
  }
}

export const translations = {
  en: {
    placeholderText: 'Select Font',
    loadingText: 'loading..',
    notFoundText: 'No fonts found',
    searchText: 'Search',
    manageText: 'Manage',
    swicherText: 'Sources'
  },
  zh: {
    placeholderText: '选择字体',
    loadingText: '加载中..',
    notFoundText: '无匹配字体',
    searchText: '搜索',
    manageText: '管理',
    swicherText: '字体'
  }
}

export const dependencies = ['dropdown']
