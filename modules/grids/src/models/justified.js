import { addClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'

class Justified {
  constructor(instanced) {
    this.api = instanced

    this.minHeight = this.api.minHeight
    this.gutter = parseFloat(this.api.gutter, 10)
    this.init()
  }

  init() {
    addClass(this.api.classes.JUSTIFIEDMODEL, this.api.element)
    this.handleState()
    this.height = this.getHeight()

    this.bind()
  }

  handleState() {
    this.chunksArr = []
    this.rowsAspectRatio = []
    this.rowsHeight = []

    this.compute()
    this.setItemSize()

    this.update()
  }

  compute() {
    let tempArr = []
    // const waitArr = []
    let count = 0
    let countItemAspectRatio

    this.api.chunks.forEach(chunk => {
      countItemAspectRatio = chunk.aspectRatio

      tempArr.forEach(tempChunk => {
        countItemAspectRatio += tempChunk.aspectRatio
      })

      const tempHeight =
        (this.api.width - (tempArr.length - 1) * this.api.gutter) /
        countItemAspectRatio
      if (tempHeight >= this.minHeight) {
        tempArr.push(chunk)
        this.rowsAspectRatio[count] = countItemAspectRatio
      } else {
        count++
        this.rowsAspectRatio[count] =
          countItemAspectRatio - this.rowsAspectRatio[count - 1]
        this.chunksArr.push(tempArr)
        tempArr = [chunk]
      }
    })

    this.chunksArr.push(tempArr)
  }

  setItemSize() {
    this.chunksArr.forEach((row, rowIndex) => {
      const chunksNum = row.length
      let rowHeight =
        (this.api.width - (chunksNum - 1) * this.api.gutter) /
        this.rowsAspectRatio[rowIndex]
      if (rowIndex === this.chunksArr.length - 1) {
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

  getHeight() {
    const lastRowFirstChunk = this.chunksArr[this.chunksArr.length - 1][0]

    return lastRowFirstChunk.movePosition.y + lastRowFirstChunk.info.height
  }

  bind() {
    bindEvent(
      {
        type: this.api.eventName(
          `${this.api.namespace}:${this.api.events.RESIZED}`
        ),
        handler: e => {
          if (e.detail.data[0] < this.api.minWidth) {
            return
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
  }

  update() {
    if (this.api.options.direction.indexOf('bottom') >= 0) {
      this.chunksArr.reverse()
    }

    this.chunksArr.forEach((rowChunks, rowIndex) => {
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
              this.chunksArr[rowIndex - 1][0].info.height +
              this.chunksArr[rowIndex - 1][0].movePosition.y +
              this.gutter
          }
        } else {
          position = {
            x:
              this.chunksArr[rowIndex][colIndex - 1].info.width +
              this.chunksArr[rowIndex][colIndex - 1].movePosition.x +
              this.gutter,
            y: this.chunksArr[rowIndex][0].movePosition.y
          }
        }

        if (this.api.options.direction.indexOf('Right') >= 0) {
          if (!colIndex) {
            position.x = this.api.width - chunk.info.width
          } else {
            position.x =
              this.chunksArr[rowIndex][colIndex - 1].movePosition.x -
              chunk.info.width -
              this.gutter
          }
        }

        chunk.movePosition = position
      })
    })

    // return chunksArr;
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

export default Justified
