import Fade from './fade'

export default class FadeDown extends Fade {
  constructor(instance) {
    super(instance)
    this.setupAnime({ translateY: [20, 0] })
  }
}
