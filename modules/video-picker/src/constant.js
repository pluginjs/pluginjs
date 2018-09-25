export const namespace = 'videoPicker'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}-{theme}',
  ACTIVE: '{namespace}-active',
  WRAP: '{namespace}-wrap',
  DISABLED: '{namespace}-disabled',
  OPENDISABLE: '{namespace}-open-disabled',
  SHOW: '{namespace}-show',
  BUTTON: '{namespace}-button',
  EMPTY: '{namespace}-empty',
  FILL: '{namespace}-fill',
  FILLPOSTER: '{namespace}-fill-poster',
  EDITOR: '{namespace}-editor',
  REMOVE: '{namespace}-remove',
  HOVER: '{namespace}-trigger-hover',
  PANEL: '{namespace}-panel',
  DROPDOWNPANEL: '{namespace}-dropdown-panel',
  CLOSE: '{namespace}-close',
  DATA: '{namespace}-data',
  SOURCE: '{namespace}-source',
  VIDEO: '{namespace}-video',
  VIDEOPLAYING: '{namespace}-video-playing',
  VIDEOLOADING: '{namespace}-video-loading',
  VIDEOANIMATE: '{namespace}-video-animate',
  VIDEOACTION: '{namespace}-video-action',
  VIDEOBTN: '{namespace}-video-btn',
  VIDEOPOSTER: '{namespace}-video-poster',
  VIDEOURL: '{namespace}-video-url',
  LOCALURL: '{namespace}-local-url',
  LOCALURLADD: '{namespace}-local-url-add',
  LOCALURLCHANGE: '{namespace}-local-url-change',
  LOCALURLDELETE: '{namespace}-local-url-delete',
  LOCALURLSELECTED: '{namespace}-local-url-selected',
  RATIO: '{namespace}-ratio',
  POSTER: '{namespace}-poster',
  POSTERSELECTED: '{namespace}-poster-selected',
  POSTERADD: '{namespace}-poster-add',
  POSTERCHANGE: '{namespace}-poster-change',
  POSTERDELETE: '{namespace}-poster-delete',
  WARNING: '{namespace}-warning',
  DROPDOWN: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger',
  INPUT: '{namespace}-input',
  // field
  FIELD: '{namespace}-field',
  FIELDTITLE: '{namespace}-field-title',
  PREVIEW: '{namespace}-preview',
  TRIGGERACTION: '{namespace}-trigger-action',
  BTNACTION: '{namespace}-btn-action',
  SAVE: '{namespace}-save',
  CANCEL: '{namespace}-cancel',
  BIGSIZE: '{namespace}-preview-16-9',
  MEDIUMSIZE: '{namespace}-preview-4-3',
  SMALLSIZE: '{namespace}-preview-3-2',
  SELECTTRIGGER: '{namespace}-select-trigger',
  CHANGEDISABLE: '{namespace}-local-url-change-disabled',
  DELDISABLE: '{namespace}-local-url-delete-disabled'
}

export const methods = ['set', 'get', 'val', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  locale: 'en',
  // pluginName: null, // if has value, The NAMESPACE will be replaced.
  sources: ['YouTube', 'Vimeo', 'Local File'],
  disabled: false,
  date: null,
  templates: {
    dropdown() {
      return `<div class='{classes.DROPDOWN}'>
      </div>`
    },
    trigger() {
      return `<div class="{classes.TRIGGER}">
      </div>`
    },
    input() {
      return `<div class='{classes.INPUT}'>
      </div>`
    },
    empty() {
      return `<div class='{classes.EMPTY }'><i class='{icon}'></i>{text}
      </div>`
    },
    fill() {
      return `<div class='{classes.FILL}'><image src='https://picsum.photos/200/300?image=1020' class='{classes.FILLPOSTER}' />
      </div>`
    },
    triggerAction() {
      return `<div class='{classes.TRIGGERACTION}'><i class='pj-icon pj-icon-pencil-write-solid {classes.EDITOR}'></i><i class='pj-icon pj-icon-delete {classes.REMOVE}'></i>
      </div>`
    },
    previewContent() {
      return `<div class='{classes.VIDEOACTION}'>
      <i class='pj-icon pj-icon-play-circle-solid {classes.VIDEOBTN}'></i>
      <div class='{classes.VIDEOPOSTER}'></div>
      <div class="{classes.VIDEOANIMATE} cp-spinner cp-round"></div></div>
     `
    },
    videoPreview() {
      return `<div class='{classes.VIDEO}'>
      </div>`
    },
    panel() {
      return `<section class='{class} {classes.PANEL}'>
        <div class='{preview}'></div></section>`
    }
  },

  selectCover() {
    return `https://picsum.photos/200/300?image=990
    `
  },
  selectLocalVideo() {
    return 'http://vjs.zencdn.net/v/oceans.mp4'
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
        return JSON.parse(value.replace(/\'/g, '"')) /* eslint-disable-line */
      } catch (e) {
        return {}
      }
    }
    return {}
  }
}

export const dependencies = [
  'dropdown',
  'popover',
  'pop-dialog',
  'tooltip',
  'video',
  'edit-panel'
]

export const translations = {
  en: {
    inputPlaceholder: 'Add Video',
    videoSource: 'Video Source',
    videoURL: 'Video URL',
    aspectRatio: 'Aspect Ratio',
    chooseVideo: 'Choose Video',
    poster: 'Poster',
    addVideo: 'Add Video',
    addPoster: 'Add Poster',
    changeVideo: 'Change Video',
    changePoster: 'Change Poster',
    save: 'Save',
    cancel: 'Cancel',
    deleteTitle: 'Are you sure you want to delete?',
    delete: 'Delete',
    useIt: 'Use It',
    inputURL: 'Please input URL'
  },
  zh: {
    inputPlaceholder: '添加视频',
    videoSource: '视频类型',
    videoURL: '视频URL',
    aspectRatio: '长宽比',
    chooseVideo: '选择视频',
    poster: '海报',
    addVideo: '添加视频',
    addPoster: '添加海报',
    changeVideo: '修改视频',
    changePoster: '修改海报',
    save: '保存',
    cancel: '取消',
    deleteTitle: '你确定要删除？',
    delete: '删除',
    useIt: '使用',
    inputURL: '请输入URL'
  }
}
