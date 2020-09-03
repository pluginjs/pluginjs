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
    this.rowsAspectRatio = []
    this.rowsHeight = []
    this.render(true)
  }

  render(effect = false) {
    this.computeChunks = this.getComputeChunks()
    this.updateChunkSize()
    this.renderChunks(effect)
    this.instance.setHeight(this.getHeight())
  }

  getComputeChunks() {
    let tempArr = []
    let count = 0
    let countItemAspectRatio
    const chunksArr = []

    this.chunks.forEach(chunk => {
      countItemAspectRatio = chunk.aspectRatio

      tempArr.forEach(tempChunk => {
        countItemAspectRatio += tempChunk.aspectRatio
      })

      const tempHeight =
        (this.width - (tempArr.length - 1) * this.gutter) / countItemAspectRatio

      if (tempHeight >= this.rowHeight) {
        tempArr.push(chunk)
        this.rowsAspectRatio[count] = countItemAspectRatio
      } else {
        count++
        this.rowsAspectRatio[count] =
          countItemAspectRatio - this.rowsAspectRatio[count - 1]
        chunksArr.push(tempArr)
        tempArr = [chunk]
      }
    })

    chunksArr.push(tempArr)

    return chunksArr
  }

  updateChunkSize() {
    this.computeChunks.forEach((row, rowIndex) => {
      const chunksNum = row.length
      let rowHeight =
        (this.width - (chunksNum - 1) * this.gutter) /
        this.rowsAspectRatio[rowIndex]

      if (rowIndex === this.computeChunks.length - 1) {
        let countHeight = 0

        this.rowsHeight.forEach(height => {
          countHeight += height
        })

        const averageHeight = countHeight / rowIndex

        rowHeight =
          rowHeight >= averageHeight * 1.1 ? averageHeight * 1.1 : rowHeight
      }

      row.forEach(chunk => {
        const size = {
          width: chunk.aspectRatio * rowHeight,
          height: rowHeight
        }

        chunk.setSize(size)
      })

      this.rowsHeight.push(rowHeight)
    })
  }

  renderChunks(effect) {
    this.computeChunks.forEach((rowChunks, rowIndex) => {
      rowChunks.forEach((chunk, colIndex) => {
        let position

        if (!rowIndex && !colIndex) {
          position = {
            x: 0,
            y: 0
          }
        } else if (rowIndex > 0 && colIndex <= 0) {
          position = {
            x: 0,
            y:
              this.computeChunks[rowIndex - 1][0].height +
              this.computeChunks[rowIndex - 1][0].position.y +
              this.gutter
          }
        } else {
          position = {
            x:
              this.computeChunks[rowIndex][colIndex - 1].width +
              this.computeChunks[rowIndex][colIndex - 1].position.x +
              this.gutter,
            y: this.computeChunks[rowIndex][0].position.y
          }
        }

        chunk.position = position
        chunk.render(effect)
      })
    })
  }

  getHeight() {
    const lastRowFirstChunk = this.computeChunks[
      this.computeChunks.length - 1
    ][0]

    return lastRowFirstChunk.position.y + lastRowFirstChunk.height
  }

  resize() {
    this.width = this.instance.getWidth()
    this.chunks = this.instance.chunks
    this.rowHeight = this.instance.rowHeight
    this.gutter = this.instance.gutter
    this.rowsAspectRatio = []
    this.rowsHeight = []
    this.render()
  }
}

export default Justified
