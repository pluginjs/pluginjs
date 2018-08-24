export const namespace = 'viewport'

export const methods = ['destroy', 'on', 'off', 'isVisible']

export const defaults = {
  rootMargin: 0, // also can have values similar to the CSS margin property, e.g."10px 20px 30px 40px"(top, right, bottom, left)
  threshold: 0 // Either a single number or an array of numbers, e.g. [0, 0.25, 0.5, 0.75, 1]
}
