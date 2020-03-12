import { addClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'

class Grid {
  constructor(instanced) {
    this.api = instanced

    this.init()
  }

  init() {
    addClass(this.api.classes.GRIDMODEL, this.api.element)

    this.handleState()

    this.height = this.getHeight()
    this.bind()
  }

  handleState() {
    this.columnCount = this.getColumnCount()
    this.chunksArr = this.compute(this.api.chunks)
  }

  getColumnCount() {
    const gutter = parseFloat(this.api.gutter, 10)
    const minWidth = parseFloat(this.api.minWidth, 10)
    const maxColumn = parseFloat(this.api.options.maxColumn, 10)

    let columnCount = Math.floor(
      (this.api.width - gutter) / (minWidth + gutter)
    )

    columnCount = columnCount < 1 ? 1 : columnCount

    if (this.api.options.maxColumn) {
      columnCount = columnCount > maxColumn ? maxColumn : columnCount
    }

    return columnCount
  }

  compute(chunks) {
    const chunksArr = []
    let tempArr = []
    let count = 0
    const chunkWidth = this.getChunkWidth()
    const columnCount = this.columnCount

    chunks.forEach(chunk => {
      if (count < columnCount) {
        this.setItemSize(chunk, chunkWidth)
        tempArr.push(chunk)
        count++
      } else {
        count = 1
        chunksArr.push(tempArr)
        this.setItemSize(chunk, chunkWidth)
        tempArr = [chunk]
      }
    })

    chunksArr.push(tempArr)

    return this.update(chunksArr)
  }

  setItemSize(chunk, width) {
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

  getHeight() {
    const index = this.chunksArr.length - 1
    let height = 0

    this.chunksArr[index].forEach(chunk => {
      height = Math.max(height, chunk.info.height)
    })

    return Math.abs(this.chunksArr[index][0].movePosition.y) + height
  }

  bind() {
    bindEvent(
      `${this.api.namespace}:${this.api.events.RESIZE}`,
      (e, instance, data) => {
        if (data < this.api.minWidth) {
          return
        }

        this.handleState()
        this.render()
      },
      this.api.element
    )

    bindEvent(
      `${this.api.namespace}:${this.api.events.FILTER}`,
      (e, instance, data) => {
        const { showChunks, hideChunks, moveChunks } = data

        this.handleState()

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

        this.api.setHeight(this.getHeight())
      },
      this.api.element
    )

    bindEvent(
      `${this.api.namespace}:${this.api.events.SORT}`,
      () => {
        this.api.setHeight(this.getHeight())
      },
      this.api.element
    )

    bindEvent(
      `${this.api.namespace}:${this.api.events.REVERSE}`,
      () => {
        this.api.setHeight(this.getHeight())
      },
      this.api.element
    )
  }

  update(chunksArr) {
    if (this.api.options.direction.indexOf('bottom') >= 0) {
      chunksArr = chunksArr.reverse()
    }

    chunksArr.forEach((row, rowIndex) => {
      row.forEach((chunk, index) => {
        const gutter = parseFloat(this.api.gutter, 10)
        const x = (chunk.info.width + gutter) * index
        const y = (chunk.info.height + gutter) * rowIndex
        const position = {
          x,
          y
        }

        if (this.api.options.direction.indexOf('Right') >= 0) {
          position.x = this.api.width - chunk.info.width - position.x
        }
        chunk.movePosition = position
      })
    })

    return chunksArr
  }

  render() {
    this.api.chunks.forEach(item => {
      // set item size.
      item.info = Object.assign({}, item.info, item.movePosition)

      if (this.api.options.delay) {
        setTimeout(() => {
          item.moveTo(item.movePosition)
        }, item.index * this.api.options.delay)
      } else {
        item.moveTo(item.movePosition)
      }
    })

    this.api.setHeight(this.getHeight(this.chunksArr))
  }
}

export default Grid
