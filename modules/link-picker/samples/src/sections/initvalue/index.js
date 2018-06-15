import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import LinkPicker from '@pluginjs/link-picker'

const element = query('.example-input', render(html, query('#initvalue')))

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
          options: {
            // dropdown's options
          }
        },
        {
          name: 'content',
          label: 'content',
          type: 'dropdown',
          connect: 'type',
          data: data.content,
          options: {
            placeholder: 'Choose a content'
          }
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
          options: {
            placeholder: 'input title'
          }
        }
      ]
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
            options: {
              // dropdown's options
            }
          },
          {
            name: 'content',
            label: 'content',
            type: 'dropdown',
            connect: 'type',
            data: data.content,
            options: {
              placeholder: 'Choose a content'
            }
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
            options: {
              placeholder: 'input title'
            }
          }
        ]
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
              options: {
                placeholder: 'input url'
              }
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
              options: {
                placeholder: 'input title'
              }
            }
          ]
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
                options: {
                  // asRadio's options
                }
              },
              {
                name: 'title',
                label: 'link title',
                type: 'input',
                data: '',
                options: {
                  placeholder: 'input title'
                }
              }
            ]
          }
        }
      }
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
        return 'value'
      }
    }
  },
  url: {
    url: ''
  },
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

LinkPicker.of(element, {})
