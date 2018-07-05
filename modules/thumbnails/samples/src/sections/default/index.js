import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Thumbnails from '@pluginjs/thumbnails'

const data = [
  {
    src: 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_s.jpg'
  },
  {
    type: 'video',
    src: 'http://farm9.staticflickr.com/8225/8558295635_b1c5ce2794_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8383/8563475581_df05e9906d_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8225/8558295635_b1c5ce2794_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8383/8563475581_df05e9906d_s.jpg'
  },
  {
    type: 'video',
    src: 'http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_s.jpg'
  },
  {
    src:
      'http://b.thumbs.redditmedia.com/Q9vfMPNE79WOrZsRT9suOfawCMwGofqR3m6YuWnhwHc.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8225/8558295635_b1c5ce2794_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8383/8563475581_df05e9906d_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_s.jpg'
  },
  {
    src: 'http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_s.jpg'
  }
]

const element = query('.thumbnails', render(html, query('#default')))
console.log(element)
console.log(Thumbnails)
Thumbnails.of(element, {
  data
})
