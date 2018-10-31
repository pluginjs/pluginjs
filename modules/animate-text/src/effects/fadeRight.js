import Fade from './fade'

export default class FadeRight extends Fade {
  constructor(instance) {
    super(instance)
    this.setupAnime({ translateX: [-20, 0] })
  }
}
