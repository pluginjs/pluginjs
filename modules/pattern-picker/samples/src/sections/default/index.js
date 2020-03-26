import { query } from '@pluginjs/dom'
import PatternPicker from '@pluginjs/pattern-picker'

const element = query('#default .example-default')
/* eslint-disable*/
const data = {
  'cutout':
  {
    'backcolor': "rgba(146, 90, 90, 1)",
    'name': "cutout",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-tow':
  {
    'name': "cutout-tow",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-1':
  {
    'name': "cutout-1",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-7':
  {
    'name': "cutout-7",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-8':
  {
    'name': "cutout-8",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-2':
  {
    'name': "cutout-2",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-2':
  {
    'name': "cutout-2",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-2':
  {
    'name': "cutout-2",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-q':
  {
    'name': "cutout-q",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-2222':
  {
    'name': "cutout-2222",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-222':
  {
    'name': "cutout-222",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'cutout-22':
  {
    'name': "cutout-22",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },

  'cutout-11':
  {
    'name': "cutout-11",
    'pattern': "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>"
  },
  'home':
  {
    'backcolor': "rgba(146, 90, 90, 1)",
    'name': "home",
    'pattern': "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><style>.st0{fill-rule:evenodd;clip-rule:evenodd}</style><path fill-opacity='0.86' fill='rgba(159, 60, 60, 1)' class='st0' d='M28.725,1.721c0.139-0.211,0.233-0.445,0.419-0.631c0.784-0.785,1.821-1.131,2.847-1.09 c1.033-0.047,2.077,0.296,2.866,1.086c0.191,0.191,0.288,0.43,0.43,0.647l27.596,23.698c1.488,1.49,1.488,3.901,0,5.393 c-1.491,1.492-3.904,1.492-5.394,0l-1.468-1.26v34.441H7.975V29.563L6.512,30.82c-1.492,1.49-3.905,1.49-5.394,0 c-1.49-1.492-1.49-3.903,0-5.395L28.725,1.721z' id='home'/></svg>"
  }
}

PatternPicker.setData(data)

PatternPicker.of(element, {})
