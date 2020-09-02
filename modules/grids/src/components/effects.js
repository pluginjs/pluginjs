const EFFECTS = {
  fadeInUp: {
    translateX() {
      return [this.position.x, this.position.x]
    },
    translateY() {
      return [this.position.y + 100, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeOutQuad',
    opacity: [0, 1]
  },
  fadeInDown: {
    translateX() {
      return [this.position.x, this.position.x]
    },
    translateY() {
      return [this.position.y - 100, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeOutQuad',
    opacity: [0, 1]
  },
  fadeInLeft: {
    translateX() {
      return [this.position.x + 100, this.position.x]
    },
    translateY() {
      return [this.position.y, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeOutQuad',
    opacity: [0, 1]
  },
  fadeInRight: {
    translateX() {
      return [this.position.x - 100, this.position.x]
    },
    translateY() {
      return [this.position.y, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeOutQuad',
    opacity: [0, 1]
  },
  zoomIn: {
    translateX() {
      return [this.position.x, this.position.x]
    },
    translateY() {
      return [this.position.y, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeOutExpo',
    // opacity: [0, 1],
    scale: [1.5, 1]
  },
  zoomOut: {
    translateX() {
      return [this.position.x, this.position.x]
    },
    translateY() {
      return [this.position.y, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeOutExpo',
    opacity: [0, 1],
    scale: [0, 1]
  },
  bounce: {
    translateX() {
      return [this.position.x, this.position.x]
    },
    translateY() {
      return [this.position.y, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeOutBack',
    opacity: [0, 1],
    scaleX: [0.4, 1],
    scaleY: [0.6, 1]
  },
  bounceIn: {
    translateX() {
      const test = Math.random(0, 1) > 0.5 ? 100 : -100
      return [this.position.x + test, this.position.x]
    },
    translateY() {
      const test = Math.random(0, 1) > 0.5 ? 100 : -100
      return [this.position.y + test, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeInOutBack',
    opacity: [0, 1],
    scaleX: [0.4, 1],
    scaleY: [0.6, 1]
  },
  cards: {
    translateX() {
      return [this.instance.width / 2, this.position.x]
    },
    translateY() {
      return [this.position.y + 200, this.position.y]
    },
    delay() {
      return this.index * this.options.delay
    },
    easing: 'easeOutExpo',
    opacity: [0, 1]
  },
  unfold: {
    translateX() {
      return [this.instance.width / 2, this.position.x]
    },
    translateY() {
      return [this.position.y + 200, this.position.y]
    },
    delay() {
      return this.options.delay * (this.length - this.index)
    },
    easing: 'easeOutExpo',
    opacity: [0, 1]
  },
  fan: {
    translateX() {
      return [this.position.x, this.position.x]
    },
    translateY() {
      return [this.position.y - 200, this.position.y]
    },
    delay() {
      return this.options.delay * (this.length - this.index)
    },
    easing: 'easeOutExpo',
    opacity: [0, 1]
  }
}

export default EFFECTS
