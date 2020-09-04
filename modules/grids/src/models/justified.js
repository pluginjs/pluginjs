import { addClass } from '@pluginjs/classes'

class Justified {
  constructor(instanced) {
    this.instance = instanced
    this.options = this.instance.options
    this.init()
  }

  init() {
    addClass(this.instance.classes.JUSTIFIEDMODEL, this.instance.element)
    this.width = this.instance.getWidth()
    this.chunks = this.instance.chunks
    this.rowHeight = this.instance.rowHeight
    this.gutter = this.instance.gutter
    this.rowsHeights = []
    this.rowsCount = 0
    this.render(true)
  }

  render(effect = false) {
    this.renderRow(0)
    this.updateSize(effect)
    this.instance.setHeight(this.height)
  }

  renderRow(startIndex) {
    let oldRowWidth = 0

    for (let index = startIndex; ; index++) {
      const chunk = this.chunks[index]
      let itemComputedWidth = Math.round(this.rowHeight * chunk.aspectRatio)

      if (itemComputedWidth > this.width) {
        itemComputedWidth = this.width
      }

      const newRowWidth = oldRowWidth + itemComputedWidth

      if (newRowWidth > this.width) {
        const oldDiff = this.width - oldRowWidth
        const newDiff = newRowWidth - this.width

        if (oldDiff < newDiff) {
          this.updateInfo(startIndex, index, oldRowWidth)
          this.rowsCount++
          this.renderRow(index)
          break
        }
      }

      const isLastItem = index === this.chunks.length - 1
      chunk.computedWidth = itemComputedWidth

      if (isLastItem) {
        const totalRowWidth =
          newRowWidth / this.width >= 0.7 ? newRowWidth : this.width
        this.updateInfo(startIndex, index + 1, totalRowWidth)
        this.updateHeight()
        break
      }

      oldRowWidth = newRowWidth
    }
  }

  updateInfo(startIndex, endIndex, rowWidth) {
    const gapCount = endIndex - startIndex - 1
    let aggregatedWidth = 0

    for (let index = startIndex; index < endIndex; index++) {
      const chunk = this.chunks[index]
      const percentWidth = chunk.computedWidth / rowWidth
      chunk.info.itemWidth =
        percentWidth * (this.width - this.gutter * gapCount)
      chunk.info.itemHeight = chunk.info.itemWidth / chunk.aspectRatio
      chunk.info.x =
        aggregatedWidth * (this.width - this.gutter * gapCount) +
        this.gutter * (index - startIndex)
      chunk.info.rowIndex = index - startIndex
      chunk.info.gapCount = gapCount

      aggregatedWidth += percentWidth

      if (index === startIndex) {
        const imagePxWidth =
          percentWidth * (this.width - gapCount * this.gutter)
        this.rowsHeights.push(imagePxWidth / chunk.aspectRatio)
      }
    }
  }

  updateHeight() {
    const totalRowsHeight = this.rowsHeights.reduce((total, item) => {
      return total + item
    })
    const finalHeight = totalRowsHeight + this.rowsCount * this.gutter
    const percentRowsHeights = this.rowsHeights.map(rowHeight => {
      return (rowHeight / finalHeight) * 100
    })
    let currentRow = -1
    let accumulatedTop = 0
    this.chunks.forEach(chunk => {
      const itemRowIndex = chunk.info.rowIndex
      const isFirstItem = itemRowIndex === 0

      if (isFirstItem) {
        currentRow++

        if (currentRow) {
          accumulatedTop += percentRowsHeights[currentRow - 1]
        }
      }

      chunk.info.y =
        (accumulatedTop / 100) * finalHeight + currentRow * this.gutter
      chunk.info.row = currentRow
    })
    this.height = finalHeight
  }

  updateSize(effect) {
    this.chunks.forEach(chunk => {
      chunk.setSize({
        width: chunk.info.itemWidth,
        height: chunk.info.itemHeight
      })
      chunk.position = {
        x: chunk.info.x,
        y: chunk.info.y
      }
      chunk.render(effect)
    })
  }

  update(effect = false) {
    this.width = this.instance.getWidth()
    this.chunks = this.instance.chunks
    this.rowHeight = this.instance.rowHeight
    this.gutter = this.instance.gutter
    this.rowsHeights = []
    this.rowsCount = 0
    this.render(effect)
  }

  add() {
    this.addChunks = this.instance.addChunks
    this.chunks = this.instance.chunks
    this.rowsHeights = []
    this.rowsCount = 0
    this.renderRow(0)
    this.chunks.forEach(chunk => {
      chunk.setSize({
        width: chunk.info.itemWidth,
        height: chunk.info.itemHeight
      })
      chunk.position = {
        x: chunk.info.x,
        y: chunk.info.y
      }
      if (this.addChunks.includes(chunk)) {
        chunk.render(true)
      } else {
        chunk.render(false)
      }
    })
    this.instance.setHeight(this.height)
  }
}

export default Justified
