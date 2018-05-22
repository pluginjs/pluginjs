import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import '@pluginjs/radio'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import LinkPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const sources = {
  content: {
    label: 'site content',
    preview: '{type}: {content}',
    fields(data) {
      return [
        {
          name: 'type',
          label: 'content type',
          type: 'dropdown',
          data: data.type,
          options: {}
        },
        {
          name: 'content',
          label: 'content',
          type: 'dropdown',
          connect: 'type',
          data: data.content,
          options: { placeholder: 'Choose a content' }
        },
        {
          name: 'target',
          label: 'open mode',
          type: 'dropdown',
          data: {
            active: '_self',
            values: {
              _self: 'same window',
              _blank: 'new window'
            }
          }
        },
        {
          name: 'title',
          label: 'link title',
          type: 'input',
          data: '',
          options: { placeholder: 'input title' }
        }
      ]
    }
  },
  archive: {
    label: 'site archive',
    preview: '{type}: {content}',
    fields(data) {
      return [
        {
          name: 'type',
          label: 'archive type',
          type: 'dropdown',
          data: data.type,
          options: {}
        },
        {
          name: 'content',
          label: 'content',
          type: 'dropdown',
          connect: 'type',
          data: data.content,
          options: { placeholder: 'Choose a content' }
        },
        {
          name: 'target',
          label: 'open mode',
          type: 'dropdown',
          data: {
            active: '_self',
            values: {
              _self: 'same window',
              _blank: 'new window'
            }
          }
        },
        {
          name: 'title',
          label: 'link title',
          type: 'input',
          data: '',
          options: { placeholder: 'input title' }
        }
      ]
    }
  },
  url: {
    label: 'external url',
    preview: '{url}',
    fields(data) {
      return [
        {
          name: 'url',
          label: 'url',
          type: 'input',
          data: data.url,
          options: { placeholder: 'input url' }
        },
        {
          name: 'target',
          label: 'open mode',
          type: 'dropdown',
          data: {
            active: '_self',
            values: {
              _self: 'same window',
              _blank: 'new window'
            }
          }
        },
        {
          name: 'title',
          label: 'link title',
          type: 'input',
          data: '',
          options: { placeholder: 'input title' }
        }
      ]
    }
  },
  scroll: {
    label: 'scroll to target',
    preview: 'scroll to {target}',
    fields(data) {
      return [
        {
          name: 'target',
          label: 'target',
          type: 'radio',
          data: data.target,
          options: {}
        },
        {
          name: 'title',
          label: 'link title',
          type: 'input',
          data: '',
          options: { placeholder: 'input title' }
        }
      ]
    }
  }
}

const datas = {
  content: {
    type: {
      active: 'page',
      values: {
        page: 'page',
        post: 'post',
        portfolio: 'portfolio',
        categogry: 'categogry archive',
        tag: 'tag archive'
      }
    },
    content: {
      active: '',
      values(type) {
        if (type === 'page') {
          return {
            active: 'page-2',
            values: {
              'page-1': 'sample page 1',
              'page-2': 'sample page 2',
              'page-3': 'sample page 3'
            }
          }
        }

        if (type === 'post') {
          return {
            active: 'post-1',
            values: {
              'post-1': 'sample post 1',
              'post-2': 'sample post 2',
              'post-3': 'sample post 3'
            }
          }
        }

        return {
          active: 'other-3',
          values: {
            'other-1': 'sample other 1',
            'other-2': 'sample other 2',
            'other-3': 'sample other 3'
          }
        }
        // return $.getJson({
        //  url: `http://example.com/getData.php?type=${type}`
        // })
      }
    }
  },
  archive: {
    type: {
      active: 'categogry',
      values: {
        categogry: 'categogry archive',
        tag: 'tag archive'
      }
    },
    content: {
      acitve: '',
      values(type) {
        if (type === 'categogry') {
          return {
            active: '',
            values: {
              music: 'Music',
              moive: 'Moive'
            }
          }
        }

        if (type === 'tag') {
          return {
            active: '',
            values: {
              'talk-show': 'Talk show',
              tour: 'Tour'
            }
          }
        }
        // return $.getJson({
        //  url: `http://example.com/getData.php?type=${type}`
        // })
      }
    }
  },
  url: { url: '' },
  scroll: {
    target: {
      active: 'top',
      values: {
        top: 'top of page',
        bottom: 'bottom of page',
        id: 'target ID'
      }
    }
  }
}

LinkPicker.registerSources(sources)
LinkPicker.registerDatas(datas)

describe('LinkPicker', () => {
  describe('LinkPicker()', () => {
    it('should have LinkPicker', () => {
      expect(LinkPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(LinkPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(LinkPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(LinkPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(LinkPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('input')
      const linkPicker = new LinkPicker(element)

      expect(linkPicker).to.be.an('object')
      expect(linkPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('input')
      const linkPicker = new LinkPicker(element)

      expect(linkPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('input')
      const $element = $(element)

      expect($element.asLinkPicker()).to.be.equal($element)

      const api = $element.data('linkPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('input')).asLinkPicker()
      expect($element.asLinkPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('input')).asLinkPicker()
      $element.asLinkPicker('destroy')
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('input')
      element.value = '{"source":"scroll","target":"#top", "title":"sdfsdf"}'
      $element = $(element)
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('linkPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asLinkPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asLinkPicker()
      api = $element.data('linkPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('linkPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asLinkPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asLinkPicker()
      api = $element.data('linkPicker')
    })

    it('should enable the plugin', () => {
      $element.asLinkPicker('disable')
      $element.asLinkPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('linkPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asLinkPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asLinkPicker()
      api = $element.data('linkPicker')
    })

    it('should disable the plugin', () => {
      $element.asLinkPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('linkPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asLinkPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
