// import As from '@pluginjs/pluginjs';

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.data = this.instance.data
    this.classes = this.instance.classes
  }

  init(el) {
    this.instance.enter('keyboard')
    this.selected = null
    this.x = 0
    this.y = 0

    this.el = el
    this.packageName = this.el.data('title')
    this.$icons = this.handleIcons()
    this.bind()
  }

  handleIcons() {
    /*
    [a,b,c,d,e,f,g,h,i,j,k]
    ==>
    [
      [a,b,c,d],
      [e,f],
      [g,h,i,j,k]
    ]

    */
    const $icons = this.el.data('$icons').filter(v => {
      if (v.css('display') !== 'none') {
        return v
      }
      return null
    })

    const count = Math.round(100 / $icons[0].width())
    if (this.el.data('classifiable')) {
      const arr = []
      $.each(this.el.data('categories'), i => {
        let items = []
        $icons.forEach($icon => {
          if ($icon.data('categories') === i) {
            if (items.length <= count) {
              items.push($icon)
            }
            if (items.length >= count) {
              arr.push(items)
              items = []
            }
          }
        })
        arr.push(items)
      })

      return arr
    }
    const arr = []
    let items = []
    $icons.forEach($icon => {
      if (items.length === count) {
        arr.push(items)
        items = []
      }
      if (items.length <= count) {
        items.push($icon)
      }
    })
    arr.push(items)
    return arr
  }
  right() {
    if (this.selected === null) {
      this.selectIcon()
      return
    }

    if (this.y >= this.$icons[this.x].length - 1) {
      if (!this.$icons[this.x + 1]) {
        return
      }

      this.x++
      this.y = 0
      this.selectIcon()
      return
    }
    this.y++
    this.selectIcon()
  }

  left() {
    if (this.selected === null) {
      this.x = this.$icons.length - 1
      this.y = this.$icons[this.x].length - 1
      this.selectIcon()
      return
    }

    if (this.y < 1) {
      if (!this.$icons[this.x - 1]) {
        return
      }

      this.x--
      this.y = this.$icons[this.x].length - 1
      this.selectIcon()
      return
    }
    this.y--
    this.selectIcon()
  }

  up() {
    if (this.selected === null) {
      this.x = this.$icons.length - 1
      this.y = this.$icons[this.x].length - 1
      this.selectIcon()
      return
    }

    if (this.x < 1) {
      this.x = 0
      this.y = 0
      this.selectIcon()
      return
    }
    if (!this.$icons[this.x - 1][this.y]) {
      this.x--
      this.y = this.$icons[this.x].length - 1
      this.selectIcon()
      return
    }
    this.x--
    this.selectIcon()
  }

  down() {
    if (this.selected === null) {
      this.selectIcon()
      return
    }

    if (this.x >= this.$icons.length - 1) {
      this.y = this.$icons[this.x].length - 1
      this.selectIcon()
      return
    }

    if (!this.$icons[this.x + 1][this.y]) {
      this.x++
      this.y = this.$icons[this.x].length - 1
      this.selectIcon()
      return
    }

    this.x++
    this.selectIcon()
  }

  update() {
    this.instance.set(this.selected)
    this.instance.$dropdown.hide()
  }

  selectIcon() {
    if (this.selected && this.selected.hasClass(this.classes.ICONHOVER)) {
      this.selected.removeClass(this.classes.ICONHOVER)
    }
    this.selected = this.$icons[this.x][this.y].addClass(this.classes.ICONHOVER)
  }

  bind() {
    this.el.on('keydown', e => {
      const code = e.keyCode
      const which = e.which

      if (code === 9 && which === 9) {
        return
      }

      if (code === 39 && which === 39) {
        this.right()
      }
      if (code === 37 && which === 37) {
        this.left()
      }

      if (code === 38 && which === 38) {
        this.up()
      }
      if (code === 40 && which === 40) {
        this.down()
      }

      if (code === 13 && which === 13 && this.selected) {
        this.update()
      }
      e.preventDefault()
    })
  }

  unbind() {
    this.el.off('keydown')
    if (this.selected) {
      this.selected.removeClass(this.classes.ICONHOVER)
      this.selected = null
    }
    this.instance.leave('keyboard')
  }
}

export default Keyboard
