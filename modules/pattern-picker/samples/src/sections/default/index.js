import { query } from '@pluginjs/dom'
import PatternPicker from '@pluginjs/pattern-picker'

const element = query('#default .example-default')
/* eslint-disable*/
const data = {
  'cutout':
  "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>",
  'graph-paper':
  "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>",
  'yyy':
  "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>",
  'bathroom-floor':
  "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>",
  'random-shapes':
  "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>",
  'circles-squares':
  "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>",
  'boxes':
  "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>",
  'tic-tac-toe':
  "<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><path d='M0 40L40 0H20L0 20zm40 0V20L20 40z' fill-rule='evenodd'/></svg>",
  
  }

PatternPicker.setData(data)

PatternPicker.of(element, {})
