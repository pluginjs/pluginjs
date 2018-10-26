import Fade from './fade'

class FadeDown extends Fade {
  constructor(instance) {
    super(instance)
    this.setupAnime({ translateY: [20, 0] })
  }
}

export default FadeDown
