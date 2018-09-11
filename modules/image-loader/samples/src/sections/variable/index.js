import { query, queryAll, append } from '@pluginjs/dom'
import ImageLoader from '@pluginjs/image-loader'

queryAll('#variable [data-api]').forEach(el =>
  el.addEventListener('click', event => {
    const el = event.target
    if (!el.matches('[data-api]')) {
      return
    }

    switch (el.dataset.api) {
      case 'string':
        ImageLoader.of('https://picsum.photos/300/200?image=0').on(
          'loaded',
          img => {
            append(`<img src="${img}" />`, query('#variable .example'))
          }
        )

        break
      case 'object':
        ImageLoader.of({
          src: 'https://picsum.photos/300/200?image=1',
          srcset: 'https://picsum.photos/600/400?image=1 2x'
        }).on('loaded', img => {
          append(
            `<img src="${img.src}" srcset="${img.srcset}" />`,
            query('#variable .example')
          )
        })
        break
      default:
        console.info(el.dataset.api)
    }
  })
)
