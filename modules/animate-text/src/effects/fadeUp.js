import Fade from './fade'

class FadeUp extends Fade {
  constructor(instance) {
    super(instance)
    this.setupAnime({ translateY: [-20, 0] })
  }
}

export default FadeUp
