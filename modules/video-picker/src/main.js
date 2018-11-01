import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import {
  setStyle,
  hideElement,
  showElement,
  getWidth,
  getHeight
} from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events' // , bindEventOnce
import { parseHTML, query, closest, wrap } from '@pluginjs/dom'
import Video from '@pluginjs/video'
import Dropdown from '@pluginjs/dropdown'
import Select from '@pluginjs/select'
import Trigger from './trigger'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class VideoPicker extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()
    this.setupI18n()
    addClass(this.classes.NAMESPACE, this.element)
    this.data = {}
    this.data.source = this.options.sources[0]
    this.data.url = ''
    this.data.poster = ''
    this.data.ratio = 'auto'

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.build()
    this.bind()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    const defaultValue = this.element.value
    if (defaultValue) {
      this.val(defaultValue, false)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }
  build() {
    addClass(this.classes.INPUT, this.element)
    this.$wrap = wrap(
      `<div class='${this.classes.NAMESPACE} ${this.classes.WRAP}'></div>`,
      this.element
    )

    if (this.options.theme) {
      addClass(this.classes.THEME, this.$wrap)
    }

    this.TRIGGER = new Trigger(this)

    this.$dropdown = parseHTML(
      template.compile(this.options.templates.dropdown())({
        classes: this.classes
      })
    )
    this.$action = parseHTML(
      template.compile(this.options.templates.previewContent())({
        classes: this.classes
      })
    )
    this.$videoPreview = parseHTML(
      template.compile(this.options.templates.videoPreview())({
        classes: this.classes
      })
    )
    this.$wrap.append(this.$dropdown)
    // set Aspect Ratio
    const sourceData = []
    this.options.sources.forEach((v, i) => {
      sourceData[i] = { label: v, value: v }
    })
    const ratioData = [
      { label: 'auto', value: 'auto' },
      { label: '3:2', value: '3:2' },
      { label: '4:3', value: '4:3' },
      { label: '16:9', value: '16:9' }
    ]

    // const localeDelete = this.translate('delete')
    // const localeSave = this.translate('save');
    const localeAddVideo = this.translate('addVideo')
    const localePddPoster = this.translate('addPoster')
    // const localeChangeVideo = this.translate('changeVideo')
    const localeChangePoster = this.translate('changePoster')

    // create priview
    this.$preview = parseHTML(`<div class='${this.classes.PREVIEW}'></div>`)
    this.$preview.append(this.$action, this.$videoPreview)
    // create components
    this.$source = parseHTML(
      `<div class='${this.classes.FIELD}'><span class='${
        this.classes.FIELDTITLE
      }'>${this.translate('videoSource')}</span><div class='${
        this.classes.SOURCE
      }'><input type='text' class='${this.classes.SELECTTRIGGER}' value='${
        sourceData[0].label
      }' /></div></div>`
    )
    this.$sourceTrigger = query(`.${this.classes.SELECTTRIGGER}`, this.$source)
    this.$videoUrlContent = parseHTML(
      `<div class='${this.classes.FIELD}'><span class='${
        this.classes.FIELDTITLE
      }'>${this.translate('videoURL')}</span><div class='${
        this.classes.VIDEOURL
      }'><input type='text' class='pj-input' /><i class='pj-icon pj-icon-close'></i></div></div>`
    )
    this.$vidosource = query(`.${this.classes.SOURCE}`, this.$source)
    this.$videoUrl = query(`.${this.classes.VIDEOURL}`, this.$videoUrlContent)
    this.$localUrlContent = parseHTML(
      `<div class='${this.classes.FIELD}' style='display:none'><span class='${
        this.classes.FIELDTITLE
      }'>${this.translate('chooseVideo')}</span><div class='${
        this.classes.LOCALURL
      } pj-input'><span class='${
        this.classes.LOCALURLADD
      }'>${localeAddVideo}</span><span class='${
        this.classes.LOCALURLCONTENT
      }'></span><span class='${
        this.classes.LOCALURLDELETE
      } pj-icon pj-icon-close'></span></div></div>`
    )
    this.$localUrl = query(`.${this.classes.LOCALURL}`, this.$localUrlContent)
    this.$ratioContent = parseHTML(
      `<div class='${this.classes.FIELD}'><span class='${
        this.classes.FIELDTITLE
      }'>${this.translate('aspectRatio')}</span><div class="${
        this.classes.RATIO
      }"><input type='text' class='${this.classes.SELECTTRIGGER}' value='${
        ratioData[0].label
      }'></div></div>`
    )
    this.$ratio = query(`.${this.classes.RATIO}`, this.$ratioContent)
    this.$ratioTrigger = query(`.${this.classes.SELECTTRIGGER}`, this.$ratio)
    this.$posterContent = parseHTML(
      `<div class='${this.classes.FIELD}'><span class='${
        this.classes.FIELDTITLE
      }'>${this.translate('poster')}</span><div class='${
        this.classes.POSTER
      } pj-input'><span class='${
        this.classes.POSTERADD
      }'>${localePddPoster}</span><span class='${
        this.classes.POSTERCHANGE
      }'>${localeChangePoster}</span><span class='${
        this.classes.POSTERNAME
      }'></span><span class='${
        this.classes.POSTERDELETE
      } pj-icon pj-icon-close'></span></div></div>`
    )
    this.$poster = query(`.${this.classes.POSTER}`, this.$posterContent)
    this.$btnAction = parseHTML(
      `<div class="${this.classes.BTNACTION}">
      <button class="pj-btn pj-btn-transparent ${
        this.classes.CANCEL
      }">${this.translate('cancel')}</button>
      <button class="pj-btn pj-btn-primary ${
        this.classes.SAVE
      }">${this.translate('save')}</button>
      </div>`
    )

    // init source dropdown
    this.DROPDOWN = Dropdown.of(this.TRIGGER.$empty, {
      target: this.$dropdown,
      reference: this.TRIGGER.element,
      templates: this.options.template,
      hideOutClick: true,
      hideOnSelect: false,
      onShow: () => {
        if (!this.DROPDOWN.is('builded')) {
          this.$dropdown.append(
            this.$preview,
            this.$source,
            this.$videoUrlContent,
            this.$localUrlContent,
            this.$ratioContent,
            this.$posterContent,
            this.$btnAction
          )
        }
      },
      onHided: () => {
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.element)
      },
      onUpdate: () => {
        this.$fillCover.setAttribute('src', this.data.poster)

        if (this.videoApi) {
          this.videoApi.stop()
        }
        this.element.value = this.val()
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.element)
        this.DROPDOWN.hide()
        addClass(this.classes.SHOW, this.$wrap)
      }
    })

    this.$sourceSelect = Select.of(this.$sourceTrigger, {
      source: sourceData,
      keyboard: true,
      onChange: value => {
        this.data.source = value
        if (value === 'Local File') {
          showElement(closest(`.${this.classes.FIELD}`, this.$localUrl))
          hideElement(closest(`.${this.classes.FIELD}`, this.$videoUrl))
        } else {
          hideElement(closest(`.${this.classes.FIELD}`, this.$localUrl))
          showElement(closest(`.${this.classes.FIELD}`, this.$videoUrl))
        }
        if (this.$videoPoster) {
          setStyle('backgroundImage', null, this.$videoPoster)
        }
        removeClass(this.classes.POSTERSELECTED, this.$poster)
        if (this.videoApi) {
          if (query('.pj-video', this.$wrap)) {
            this.removeVideo()
          }
        }
      }
    })

    this.$ratioSelect = Select.of(this.$ratioTrigger, {
      source: ratioData,
      keyboard: true,
      onChange: value => {
        this.data.ratio = value
        this.changeRatio(value)
      }
    })

    this.$fillCover = query(`.${this.classes.FILLPOSTER}`, this.TRIGGER.element)
    this.$video = query(`.${this.classes.VIDEO}`, this.$preview)
    this.$urlInput = query('input', this.$videoUrl)
    this.$videoAction = query(`.${this.classes.VIDEOACTION}`, this.$preview)
    this.$videoPoster = query(`.${this.classes.VIDEOPOSTER}`, this.$preview)
    this.$posterChange = query(`.${this.classes.POSTERCHANGE}`, this.$poster)
    this.$posterName = query(`.${this.classes.POSTERNAME}`, this.$poster)
  }

  bind() {
    compose(
      // play video
      bindEvent(this.eventName('click'), `.${this.classes.VIDEOACTION}`, () => {
        if (!this.is('loaded')) {
          this.loadVideo()
          return
        }

        if (!this.is('playing')) {
          addClass(this.classes.VIDEOPLAYING, this.$videoAction)
          this.videoApi.play()
          this.enter('playing')
        } else {
          removeClass(this.classes.VIDEOPLAYING, this.$videoAction)
          this.videoApi.pause()
          this.leave('playing')
          if (this.is('loaded') && this.$videoPoster) {
            setStyle('backgroundImage', null, this.$videoPoster)
          }
        }
      }),

      // input video url
      bindEvent(
        this.eventName('change'),
        `.${this.classes.VIDEOURL} input`,
        () => {
          removeClass(this.classes.WARNING, this.$urlInput).setAttribute(
            'placeholder',
            ''
          )
          this.data.url = this.$urlInput.value
          this.changeVideo()
          return false
        }
      ),
      bindEvent(this.eventName('click'), `.${this.classes.VIDEOURL} i`, () => {
        this.removeVideo()
      }),

      // local video
      bindEvent(this.eventName('click'), `.${this.classes.LOCALURLADD}`, () => {
        // this.data.url = this.options.selectLocalVideo.call(this)
        addClass(this.classes.LOCALURLSELECTED, this.$localUrl)
        this.options.onSelectLocalVideo.call(
          this,
          this.selectLocalVideo.bind(this)
        )
      }),
      bindEvent(
        this.eventName('click'),
        `.${this.classes.LOCALURLDELETE}`,
        () => {
          removeClass(this.classes.LOCALURLSELECTED, this.$localUrl)
          this.removeVideo()
        }
      )
    )(this.$wrap)

    // change poster
    compose(
      bindEvent(this.eventName('click'), `.${this.classes.POSTERADD}`, () => {
        this.addPoster(this.options.selectCover.call(this))
      }),
      bindEvent(this.eventName('click'), `.${this.classes.POSTERNAME}`, () => {
        addClass(this.classes.POSTERENTERCHANGE, this.$poster)
      }),
      bindEvent(
        this.eventName('click'),
        `.${this.classes.POSTERCHANGE}`,
        () => {
          if (!this.is('posterChange')) {
            removeClass(this.classes.POSTERENTERCHANGE, this.$poster)
            this.addPoster('https://picsum.photos/200/300?image=1015')
            addClass(this.classes.POSTERCHANGEDISABLED, this.$poster)
          }
          this.enter('posterChange')
        }
      ),
      bindEvent(
        this.eventName('click'),
        `.${this.classes.POSTERDELETE}`,
        () => {
          removeClass(this.classes.POSTERCHANGEDISABLED, this.$poster)
          this.deletePoster()
          this.leave('posterChange')
        }
      )
    )(this.$wrap)

    compose(
      bindEvent(this.eventName('click'), `.${this.classes.CANCEL}`, () => {
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.element)
        this.DROPDOWN.hide()
      }),
      bindEvent(this.eventName('click'), `.${this.classes.SAVE}`, () => {
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.element)
        this.DROPDOWN.hide()
        this.$fillCover.setAttribute('src', this.data.poster)
        if (this.videoApi) {
          this.videoApi.stop()
        }
        this.element.value = this.val()
        addClass(this.classes.SHOW, this.$wrap)
      })
    )(this.$btnAction)
  }

  addPoster(url) {
    this.data.poster = url
    this.$posterName.innerHTML = this.data.poster
    addClass(this.classes.POSTERSELECTED, this.$poster)

    if (this.$videoPoster) {
      setStyle(
        {
          backgroundImage: `url(${this.data.poster})`,
          backgroundSize: '100% 100%'
        },
        this.$videoPoster
      )
    }
  }

  deletePoster() {
    this.data.poster = ''
    removeClass(this.classes.POSTERSELECTED, this.$poster)
    removeClass(this.classes.POSTERENTERCHANGE, this.$poster)
    setStyle('backgroundImage', 'none', this.$videoPoster)
  }

  changeRatio(value) {
    if (hasClass(this.classes.SMALLSIZE, this.$preview)) {
      removeClass(this.classes.SMALLSIZE, this.$preview)
    }
    if (hasClass(this.classes.MEDIUMSIZE, this.$preview)) {
      removeClass(this.classes.MEDIUMSIZE, this.$preview)
    }
    if (hasClass(this.classes.BIGSIZE, this.$preview)) {
      removeClass(this.classes.BIGSIZE, this.$preview)
    }
    if (value === 'auto') { /* eslint-disable-line */
    } else if (value === '3:2') {
      addClass(this.classes.SMALLSIZE, this.$preview)
    } else if (value === '4:3') {
      addClass(this.classes.MEDIUMSIZE, this.$preview)
    } else if (value === '16:9') {
      addClass(this.classes.BIGSIZE, this.$preview)
    }
    if (this.is('loaded')) {
      this.videoApi.setSize(getWidth(this.$video), getHeight(this.$video))
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
  }

  changeVideo() {
    if (this.videoApi) {
      this.videoApi.switchVideo(this.data.url)
    }
  }
  selectLocalVideo(url) {
    this.data.url = url
    this.pos = url.lastIndexOf('/')
    if (this.pos === -1) {
      this.pos = url.lastIndexOf('\\')
    }
    const filename = url.substr(this.pos + 1)
    query(
      `.${this.classes.LOCALURLCONTENT}`,
      this.$localUrl
    ).innerHTML = filename
  }

  removeVideo() {
    this.data.poster = ''
    this.data.url = ''
    this.element.value = ''
    this.$urlInput.value = ''
    if (this.videoApi) {
      if (this.videoApi.element) {
        this.videoApi.destroy()
      }
    }

    setStyle(
      {
        backgroundImage: `url(${this.data.poster})`
      },
      this.$videoPoster
    )
    removeClass(
      this.classes.CHANGEDISABLE,
      query(`.${this.classes.LOCALURLCHANGE}`, this.$localUrl)
    )
    removeClass(
      this.classes.CHANGEDISABLE,
      query(`.${this.classes.LOCALURLCHANGE}`, this.$poster)
    )
    removeClass(this.classes.LOCALURLSELECTED, this.$localUrl)
    removeClass(this.classes.POSTERSELECTED, this.$poster)
    removeClass(this.classes.VIDEOPLAYING, this.$videoAction)
    removeClass(this.classes.VIDEOLOADING, this.$videoAction)

    this.leave('loaded')
    this.leave('playing')
    this.leave('urlChange')
    this.leave('posterChange')
  }

  loadVideo() {
    const url = this.data.url
    if (!url.replace(/(^\s*)|(\s*$)/g, '').length) {
      addClass(this.classes.WARNING, this.$urlInput).setAttribute(
        'placeholder',
        this.translate('inputURL')
      )

      return false
    }
    const videoConfig = { source: 'youtube' }
    switch (this.data.source) {
      case 'YouTube':
        videoConfig.type = 'youtube'
        break
      case 'Vimeo':
        videoConfig.type = 'vimeo'
        break
      default:
        videoConfig.type = 'html5'
        break
    }

    if (url.indexOf('http') === 0 || url.indexOf('https') === 0) {
      videoConfig.url = `${url}`
    } else {
      videoConfig.id = `${url}`
    }

    if (videoConfig.type === 'html5') {
      videoConfig.url = `${url}`
    }
    this.videoApi = Video.of(this.$video, videoConfig)
    this.videoApi.options.onLoad = () => {
      addClass(this.classes.VIDEOLOADING, this.$videoAction)
    }

    this.videoApi.options.onLoaded = () => {
      removeClass(this.classes.VIDEOLOADING, this.$videoAction)
      addClass(this.classes.VIDEOPLAYING, this.$videoAction)
    }

    // this.videoApi.load()
    this.videoApi.setSize(getWidth(this.$video), getHeight(this.$video))

    this.enter('loaded')
    this.enter('playing')
    return false
  }

  update(data) {
    Object.entries(data).forEach(([label, value]) => {
      switch (label) {
        case 'source':
          this.options.sources.forEach(v => {
            if (v.toLowerCase() === value.toLowerCase()) {
              this.$sourceSelect.set(v)
            }
          })
          break
        case 'url':
          this.$urlInput.value = value
          break
        case 'id':
          this.data.url = value
          this.$urlInput.value = value
          break
        case 'ratio':
          this.$ratioSelect.set(value)
          break
        case 'poster':
          if (value) {
            this.addPoster(value)
          }
          break
        default:
          break
      }
    })

    this.$fillCover.setAttribute('src', this.data.poster)

    if (this.videoApi) {
      this.videoApi.stop()
    }
    this.element.value = this.val()
    addClass(this.classes.SHOW, this.$wrap)
  }

  set(data, trigger = true) {
    if (!data || typeof data === 'undefined') {
      return
    }

    this.data = Object.assign({}, this.data, data)

    if (trigger) {
      this.trigger(EVENTS.CHANGE, data)
    }
    this.update(this.data)
  }

  get() {
    if (!this.data.url || typeof this.data.url === 'undefined') {
      return null
    }
    return this.data
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      const val = this.options.process.call(this, this.get())
      return val
    }

    return this.set(this.options.parse.call(this, value), trigger)
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false
      this.leave('disabled')
      removeClass(this.classes.DISABLED, this.$wrap)
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.DROPDOWN.disable()
      this.element.disabled = true
      this.enter('disabled')
      addClass(this.classes.DISABLED, this.$wrap)
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.NAMESPACE, this.element)
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default VideoPicker
