export const namespace = 'viewport'

export const events = {
  ENTER: 'enter',
  LEAVE: 'leave'
}

export const methods = ['destroy', 'getOffset', 'isVisible']

export const defaults = {
  container: null,
  offset: '0px', // also can have values similar to the CSS margin property, e.g."10px 20px 30px 40px"(top, right, bottom, left)
  threshold: 0 // Either a single number or an array of numbers, e.g. [0, 0.25, 0.5, 0.75, 1]
}
