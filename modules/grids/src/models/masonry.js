import { addClass } from '@pluginjs/classes'

/* eslint-disable */
class Masonry {
  constructor(instanced) {
    this.api = instanced

    this.init()
  }

  init() {
    addClass(this.api.classes.MASONRYMODEL, this.api.element)
    // this.api.$element.addClass(this.api.classes.MASONRYMODEL)
    this.handleState()
    this.height = this.getHeight()

    this.bind()
  }

  handleState() {
    this.columnCount = this.getColumnCount()
    this.columnHeights = this.initColumnHeights()

    this.api.chunks.forEach(chunk => {
      this.setItemSize(chunk)
    })

    this.update()
  }

  setItemSize(chunk) {
    const width = this.getChunkWidth()
    const size = {
      width,
      height: chunk.info.height * (width / chunk.info.width)
    }

    chunk.setSize(size)
  }

  getChunkWidth() {
    const gutter = parseFloat(this.api.options.gutter, 10)
    return (this.api.width - (this.columnCount - 1) * gutter) / this.columnCount
  }

  getColumnCount() {
    const gutter = parseFloat(this.api.gutter, 10)
    const minWidth = parseFloat(this.api.minWidth, 10)
    let columnCount = Math.floor(
      (this.api.width - gutter) / (minWidth + gutter)
    )
    if (this.api.options.maxColumn) {
      columnCount =
        columnCount > this.api.options.maxColumn
          ? this.api.options.maxColumn
          : columnCount
    }

    return columnCount
  }

  initColumnHeights() {
    // support IE11
    if (!Array.prototype.fill) {
      const arr = []

      for (let i = 0; i < this.columnCount; i++) {
        arr.push(i)
      }

      return arr
    }

    return new Array(this.columnCount).fill(0)
  }

  getMinHeightColumn() {
    let index = 0
    let value = this.columnHeights[0]

    this.columnHeights.forEach((val, i) => {
      if (val < value) {
        index = i
        value = val
      }
    })

    return index
  }

  getHeight() {
    return Math.max(...this.columnHeights)
  }

  bind() {
    bindEvent(
      {
        type: this.api.eventName(
          `${this.api.namespace}:${this.api.events.RESIZED}`
        ),
        handler: e => {
          if (e.detail.data[0] < this.api.minWidth) {
            return false
          }
          this.handleState()
          this.render()
        }
      },
      this.api.element
    )

    bindEvent(
      {
        type: this.api.eventName(
          `${this.api.namespace}:${this.api.events.FILTER}`
        ),
        handler: e => {
          const { showChunks, hideChunks, moveChunks } = e.detail.data[0]

          this.handleState()
          this.api.setHeight(this.getHeight())

          if (hideChunks) {
            hideChunks.forEach(chunk => {
              chunk.hide()
            })
          }

          if (showChunks) {
            showChunks.forEach(chunk => {
              chunk.show()
            })
          }

          if (moveChunks) {
            moveChunks.forEach(chunk => {
              chunk.moveTo(chunk.movePosition)
            })
          }
        }
      },
      this.api.element
    )

    bindEvent(
      {
        type: this.api.eventName(
          `${this.api.namespace}:${this.api.events.SORT}`
        ),
        handler: () => {
          this.api.setHeight(this.getHeight())
        }
      },
      this.api.element
    )

    // this.api.$element.on(
    //   this.api.eventName(`${this.api.namespace}:${this.api.events.RESIZED}`),
    //   (e, el, data) => {
    //     if (data < this.api.minWidth) {
    //       return false
    //     }
    //     this.handleState()
    //     this.render()
    //   }
    // )

    // this.api.$element.on(
    //   this.api.eventName(`${this.api.namespace}:${this.api.events.FILTER}`),
    //   (e, el, data) => {
    //     const {
    //       showChunks,
    //       hideChunks,
    //       moveChunks
    //     } = data

    //     this.handleState()
    //     this.api.setHeight(this.getHeight())

    //     hideChunks.forEach(chunk => {
    //       chunk.hide()
    //     })

    //     showChunks.forEach(chunk => {
    //       chunk.show()
    //     })

    //     moveChunks.forEach(chunk => {
    //       chunk.moveTo(chunk.movePosition)
    //     })
    //   }
    // )

    // this.api.$element.on(
    //   this.api.eventName(`${this.api.namespace}:${this.api.events.SORT}`),
    //   () => {
    //     this.api.setHeight(this.getHeight())
    //   }
    // )
  }

  update() {
    const gutter = parseFloat(this.api.gutter, 10)

    this.api.chunks.forEach(chunk => {
      const minCol = this.getMinHeightColumn()

      const position = {
        x: 0,
        y: 0
      }

      position.x = (chunk.info.width + gutter) * minCol
      position.y = this.columnHeights[minCol]

      this.columnHeights[minCol] += chunk.info.height + gutter

      if (this.api.options.direction.indexOf('Right') >= 0) {
        position.x = this.api.width - chunk.info.width - position.x
      }

      chunk.movePosition = position
    })

    if (this.api.options.direction.indexOf('bottom') >= 0) {
      const maxHeight = Math.max(...this.columnHeights)

      this.api.chunks.forEach(chunk => {
        chunk.movePosition.y =
          maxHeight - (chunk.movePosition.y + chunk.info.height)
      })
    }
  }

  render() {
    this.api.chunks.forEach(item => {
      // set item size.
      // item.info = $.extend({}, item.info, item.movePosition)
      item.info = Object.assign({}, item.info, item.movePosition)

      if (this.api.options.delay) {
        setTimeout(() => {
          item.moveTo(item.movePosition)
        }, item.index * this.api.options.delay)
      } else {
        item.moveTo(item.movePosition)
      }
    })

    this.api.setHeight(this.getHeight())
  }
}

export default Masonry
