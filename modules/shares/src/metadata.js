import { query } from '@pluginjs/dom'

export default class Metadata {
  constructor(options) {
    /* eslint prefer-const: 'off' */
    const { url, title, description, image } = options

    this.url = url || this.getUrl()
    this.title = title || this.getTitle()
    this.description = description || this.getDescription()
    this.image = image || this.getImage()
  }

  getAll(service = '') {
    let { url, title, description, image } = this

    if (service === 'twitter') {
      title = this.getMetaContent('twitter:title') || title
      description = this.getMetaContent('twitter:description') || description
      image = this.getMetaContent('twitter:image:src') || image
    }

    return {
      url,
      title,
      description,
      image
    }
  }

  getUrl() {
    return this.getMetaContent('og:url') || window.location.href
  }

  getTitle() {
    return (
      this.getMetaContent('og:title') ||
      this.getMetaContent('name', 'itemprop') ||
      document.title
    )
  }

  getDescription() {
    return (
      this.getMetaContent('og:description') ||
      this.getMetaContent('description', 'itemprop') ||
      this.getMetaContent('description')
    )
  }

  getImage() {
    let image =
      this.getMetaContent('og:image') ||
      this.getMetaContent('description', 'itemprop') ||
      this.getMetaContent('image') ||
      ''

    if (!image) {
      const $image = query('link[rel="apple-touch-icon"]')
      if ($image) {
        image = $image.href
      }
    }

    return image
  }

  getMetaContent(name, attr) {
    /* eslint no-nested-ternary: 'off' */
    let text = ''
    const meta = query(
      `meta[${
        attr ? attr : name.indexOf('og:') === 0 ? 'property' : 'name'
      }="${name}"]`
    )

    if (meta) {
      text = meta.getAttribute('content')
    }
    return text
  }
}
