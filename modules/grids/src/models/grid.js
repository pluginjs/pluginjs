import { addClass } from '@pluginjs/classes'

class Grid {
  constructor(instanced) {
    this.instance = instanced
    this.options = this.instance.options
    this.init()
  }

  init() {
    addClass(this.instance.classes.GRIDMODEL, this.instance.element)
    this.chunks = this.instance.chunks
    this.ratio = this.instance.ratio
    this.column = this.instance.column
    this.gutter = this.instance.gutter
    this.width = this.instance.getWidth()
    this.chunkWidth = this.getColWidth()
    this.chunkHeight = this.chunkWidth / this.ratio
    this.render(true)

    // this.bind()
  }

  getColWidth() {
    return (this.width - (this.column - 1) * this.gutter) / this.column
  }

  render(effect = false) {
    this.computeChunks = this.getComputeChunks()
    this.renderChunks(this.computeChunks, effect)
    this.instance.setHeight(this.getHeight())
  }

  renderChunks(chunks, effect) {
    chunks.forEach((row, rowIndex) => {
      row.forEach((chunk, index) => {
        const gutter = parseFloat(this.gutter, 10)
        const x = (chunk.width + gutter) * index
        const y = (chunk.height + gutter) * rowIndex
        const position = {
          x,
          y
        }

        chunk.position = position
        chunk.render(effect)
      })
    })
  }

  getComputeChunks() {
    let count = 0
    const chunksArr = []
    let tempArr = []

    this.chunks.forEach(chunk => {
      chunk.setSize(this.chunkWidth)
      if (count < this.column) {
        tempArr.push(chunk)
        count++
      } else {
        count = 1
        chunksArr.push(tempArr)
        tempArr = [chunk]
      }
    })

    chunksArr.push(tempArr)
    return chunksArr
  }

  getHeight() {
    const index = this.computeChunks.length - 1
    let height = 0

    if (this.computeChunks[index].length === 0) {
      return height
    }

    this.computeChunks[index].forEach(chunk => {
      height = Math.max(height, chunk.height)
    })

    return Math.abs(this.computeChunks[index][0].position.y) + height
  }

  resize() {
    this.chunks = this.instance.chunks
    this.column = this.instance.column
    this.gutter = this.instance.gutter
    this.width = this.instance.getWidth()
    this.chunkWidth = this.getColWidth()
    this.chunkHeight = this.chunkWidth / this.ratio
    this.render()
  }

  // bind() {
  //   bindEvent(
  //     `${this.instance.namespace}:${this.instance.events.RESIZE}`,
  //     (e, instance, data) => {
  //       if (data < this.instance.minWidth) {
  //         return
  //       }

  //       this.handleState()
  //       this.render()
  //     },
  //     this.instance.element
  //   )

  //   bindEvent(
  //     `${this.instance.namespace}:${this.instance.events.REVERSE}`,
  //     () => {
  //       this.instance.setHeight(this.getHeight())
  //     },
  //     this.instance.element
  //   )
  // }
}

export default Grid
