import { query } from '@pluginjs/dom'
import Gallery from '@pluginjs/gallery'

const data = [
  {
    type: 'image',
    orig: 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg',
    thumb: 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_s.jpg'
  },
  {
    type: 'image',
    orig: 'http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_b.jpg',
    thumb: 'http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_s.jpg'
  },
  {
    type: 'image',
    orig: 'http://farm9.staticflickr.com/8225/8558295635_b1c5ce2794_b.jpg',
    thumb: 'http://farm9.staticflickr.com/8225/8558295635_b1c5ce2794_s.jpg'
  },
  {
    type: 'image',
    orig: 'http://farm9.staticflickr.com/8383/8563475581_df05e9906d_b.jpg',
    thumb: 'http://farm9.staticflickr.com/8383/8563475581_df05e9906d_s.jpg'
  },
  {
    type: 'image',
    orig: 'http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_b.jpg',
    thumb: 'http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_s.jpg'
  },
  {
    type: 'image',
    orig: 'http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_b.jpg',
    thumb: 'http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_s.jpg'
  },
  {
    type: 'image',
    orig: 'http://farm9.staticflickr.com/8378/8559402848_9fcd90d20b_b.jpg',
    thumb: 'http://farm9.staticflickr.com/8378/8559402848_9fcd90d20b_s.jpg'
  }
]

const element = query('#default .gallery')
Gallery.of(element, {
  data
})
