import Fade from './fade'

class FadeLeft extends Fade {
  constructor(instance) {
    super(instance)
    this.setupAnime({ translateX: [20, 0] })
  }
}

export default FadeLeft
