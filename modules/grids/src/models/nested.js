import { addClass } from '@pluginjs/classes'

import { bindEvent } from '@pluginjs/events'

class Nested {
  constructor(instanced) {
    this.api = instanced

    this.gutter = parseFloat(this.api.gutter, 10)
    this.init()
  }

  init() {
    addClass(this.api.classes.NESTEDMODEL, this.api.element)
    this.handleState()
    this.height = this.getHeight()

    this.bind()
  }

  handleState() {
    this.waitArr = []
    this.columnCount = this.getColumnCount()
    this.chunkWidth = this.getChunkWidth()
    this.chunksArr = []

    this.compute()
    this.update()
  }

  compute() {
    this.api.chunks.forEach(chunk => {
      this.insert(chunk)
    })
  }

  insert(chunk) {
    const { row, col } = chunk
    const emptyBox = this.findEmpty({
      row,
      col
    })

    this.setChunkInfo(chunk, emptyBox, {
      row,
      col
    })
  }

  findEmpty(size, arr = this.chunksArr, maxCol = this.columnCount) {
    let position
    const rowSize = size.row

    const colSize = size.col

    for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
      if (this.isFullArr(arr[rowIndex])) {
        continue
      }

      for (let colIndex = 0; colIndex < maxCol; colIndex++) {
        const originTL = {
          row: rowIndex,
          col: colIndex
        }
        const originTR = {
          row: rowIndex,
          col: colIndex + colSize - 1
        }

        const originBL = {
          row: rowIndex + rowSize - 1,
          col: colIndex
        }
        const originBR = {
          row: rowIndex + rowSize - 1,
          col: colIndex + colSize - 1
        }

        if (
          this.isEmpty(originTL) &&
          this.isEmpty(originTR) &&
          this.isEmpty(originBL) &&
          this.isEmpty(originBR)
        ) {
          position = {
            row: rowIndex,
            col: colIndex
          }
          return position
        }
        continue
      }
    }

    if (!position) {
      position = {
        row: arr.length,
        col: 0
      }
    }

    return position
  }

  setItemSize(chunk) {
    const width = this.getChunkWidth()
    const height = width / chunk.aspectRatio

    const size = {
      width: width * chunk.col + this.gutter * (chunk.col - 1),
      height: height * chunk.row + this.gutter * (chunk.row - 1)
    }

    chunk.setSize(size)
  }

  setChunkInfo(chunk, position, size) {
    const { row, col } = size
    this.setItemSize(chunk)

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        if (j + position.row >= this.chunksArr.length) {
          const tempArr = []
          tempArr[position.col] = chunk
          this.chunksArr.push(tempArr)
        } else {
          this.chunksArr[j + position.row][i + position.col] = chunk
        }

        chunk.movePosition = {
          x: position.col * (this.chunkWidth + this.gutter),
          y: position.row * (this.chunkWidth / chunk.aspectRatio + this.gutter)
        }
      }
    }
  }

  isFullArr(arr, maxCol = this.columnCount) {
    for (let i = 0; i < maxCol; i++) {
      if (typeof arr[i] === 'undefined') {
        return false
      }
    }

    return true
  }

  isEmpty(position, arr = this.chunksArr, maxCol = this.columnCount) {
    const { row, col } = position

    if (col >= maxCol) {
      return false
    }

    if (row >= arr.length) {
      return true
    }

    if (arr[row].length <= maxCol && arr[row].lenth < col) {
      return true
    }

    return !arr[row][col]
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

  getChunkWidth() {
    const gutter = parseFloat(this.api.options.gutter, 10)
    return (this.api.width - (this.columnCount - 1) * gutter) / this.columnCount
  }

  getHeight() {
    let height = 0
    let count = 0

    this.chunksArr.forEach((row, index) => {
      if (!row[count]) {
        count++
      }

      if (count >= this.columnCount) {
        count = 0
      }

      if (
        index > 0 &&
        row[count].index === this.chunksArr[index - 1][count].index
      ) {
        return
      }

      height += row[count].info.height + this.gutter
    })

    return height - this.gutter
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
    if (this.api.options.direction.indexOf('Right') >= 0) {
      this.api.chunks.forEach(chunk => {
        chunk.movePosition.x =
          this.api.width - chunk.info.width - chunk.movePosition.x
      })
    }

    if (this.api.options.direction.indexOf('bottom') >= 0) {
      this.api.chunks.forEach(chunk => {
        chunk.movePosition.y =
          this.height - chunk.info.height - chunk.movePosition.y
      })
    }
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

export default Nested
