import PopperJs from 'popper.js'

export default class Popper {
  static placements = PopperJs.placements

  constructor() {
    return {
      destroy: () => {}, // eslint-disable-line no-empty-function
      scheduleUpdate: () => {} // eslint-disable-line no-empty-function
    }
  }
}
