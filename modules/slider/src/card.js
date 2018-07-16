const TYPES = ['image', 'video', 'map', 'iframe', 'inline']

class Card {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.card = this.instance.getElement('card')
    this.types = TYPES
  }
}
export default Card
