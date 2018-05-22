import Swipe from '@pluginjs/swipe'

import { bindEvent } from '@pluginjs/events'
import { getStyle } from '@pluginjs/styled'

const DEFAULT = {
  arrows: false,
  pagination: false,
  drag: true,
  dragFree: false,
  frictionFactor: 0.8, // 0 - 1
  group: false,
  multiple: false,
  defaultActive: 0,
  justifiedResponsive: ['1920:300', '1240:260', '720:200', '480:150'] // [justified mode] => 'clientWidth:chunkHeight'
}

class Carousel {
  constructor(instanced, opts, model) {
    this.api = instanced
    this.opts = Object.assign({}, DEFAULT, opts, {
      gutter: this.api.options.gutter,
      itemNums: this.api.options.maxColumn
    })

    this.model = model
    this.classes = this.api.classes
    this.gutter = parseFloat(this.opts.gutter, 10)

    this.itemNums = this.getColumnNum(this.opts.itemNums)
    this.multiple = this.opts.multiple

    if (this.model === 'justified') {
      this.justifiedResponsive = this.opts.justifiedResponsive
        .map(item => {
          const tempVal = item.split(':')
          return {
            wrapWidth: parseInt(tempVal[0], 10),
            chunkHeight: parseInt(tempVal[1], 10)
          }
        })
        .sort((prev, next) => {
          if (prev.wrapWidth < next.wrapWidth) {
            return -1
          }
          return 1
        })
    }

    if (this.model === 'nested') {
      this.nestedArr = []
    }

    if (this.model === 'masonry' && this.multiple) {
      this.opts.multiple = false
      this.multiple = false
    }

    this.init()
  }

  init() {
    const that = this

    const config = Object.assign({}, this.opts, {
      itemNums: this.itemNums,
      containerSelector: `.${this.classes.CONTAINER}`,
      itemSelector: `.${this.classes.CHUNK}`,
      advanced: {
        getItemInstances() {
          return that.getItemInstances(this)
        },
        computeItemLocation() {
          return that.computeItemLocation(this)
        },
        computeWidthResize() {
          return that.computeWidthResize(this)
        }
      }
    })

    this.swipe = Swipe.of(this.api.$inner, config)

    this.updateHeight()
    this.bind()
  }

  getItemInstances(swipe) {
    this.api.chunks.forEach(chunk => {
      let width
      let height

      if (this.model === 'justified') {
        for (const key of this.justifiedResponsive.keys()) {
          const val = this.justifiedResponsive[key]
          if (swipe.width < val.wrapWidth) {
            // set chunk height in justified model
            height = val.chunkHeight
            width = chunk.aspectRatio * height
            break
          }
        }
      } else {
        width = swipe.getItemWidth()
        height = width / chunk.aspectRatio
      }

      if (this.model === 'nested') {
        width = (width + this.gutter) * chunk.col - this.gutter
        height = (height + this.gutter) * chunk.row - this.gutter
      }

      chunk.setSize({
        width,
        height
      })
    })
    return this.api.chunks
  }

  computeItemLocation(swipe) {
    if (this.multiple) {
      this.handleMultipleItemLocation(swipe)
    } else {
      let width = 0

      this.api.chunks.forEach(chunk => {
        const config = {
          x: width,
          y: 0
        }

        width += chunk.info.width + this.gutter
        chunk.movePosition = config
        chunk.info = Object.assign({}, chunk.info, chunk.movePosition)
      })

      swipe.setWidth(width - this.gutter)
    }

    swipe.itemInstances = this.api.chunks
  }

  computeWidthResize(swipe) {
    swipe.itemNums = this.getColumnNum(this.itemNums)
    this.itemNums = swipe.itemNums

    swipe.setWidth(parseFloat(getStyle('width', this.api.$container), 10))
    swipe.width = parseFloat(getStyle('width', swipe.element), 10)

    swipe.itemInstances = swipe.getItemInstances()

    swipe.computeItemLocation()
    this.updateSortedItems()
    this.updatePagination()

    this.updateChunk()
    this.updateHeight()

    swipe.moveTo(swipe.active)
  }

  bind() {
    const that = this
    this.swipe.options.onMoveEnd = function() {
      that.updateHeight()
    }

    bindEvent(
      {
        type: this.api.eventName(
          `${this.api.namespace}:${this.api.events.FILTER}`
        ),
        handler: e => {
          const { showChunks, hideChunks, moveChunks } = e.detail.data[0]

          this.swipe.itemInstances = this.getItemInstances(this.swipe)
          this.computeItemLocation(this.swipe)

          if (hideChunks) {
            hideChunks.forEach(chunk => {
              chunk.hide()
            })
          }

          if (showChunks) {
            this.api.ANIMATE.loading(showChunks)
          }

          if (moveChunks) {
            moveChunks.forEach(chunk => {
              chunk.moveTo(chunk.movePosition)
            })
          }

          this.updateSortedItems()
          this.updatePagination()

          this.swipe.moveTo(this.swipe.active)
        }
      },
      this.api.element
    )

    bindEvent(
      {
        type: this.api.eventName(
          `${this.api.namespace}:${this.api.events.REVERSE}`
        ),
        handler: () => {
          this.swipe.itemInstances = this.getItemInstances(this.swipe)
          this.computeItemLocation(this.swipe)
          this.update()
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
          this.swipe.itemInstances = this.api.chunks
          this.updateSortedItems()
          this.updatePagination()
        }
      },
      this.api.element
    )

    if (this.opts.drag) {
      this.swipe.options.onDragStart = () => {
        this.api.trigger(this.api.events.DRAGSTART)
      }

      this.swipe.options.onDragEnd = () => {
        this.api.trigger(this.api.events.DRAGEND)
      }
    }

    this.swipe.options.onMoveEnd = () => {
      this.api.trigger(this.api.events.MOVEEND, this.swipe.active)
    }
  }

  update() {
    this.updateChunk()
    this.updateSortedItems()
    this.updatePagination()
    this.updateHeight()
  }

  updateChunk() {
    this.api.chunks.forEach(chunk => {
      chunk.moveTo(chunk.movePosition)
    })

    this.swipe.itemInstances = this.api.chunks
  }

  updateHeight(swipe = this.swipe) {
    let height
    const tempArr = [].concat(swipe.itemInstances)

    if (this.multiple) {
      height = tempArr[0].info.height * 2 + this.gutter

      if (this.model === 'nested') {
        tempArr.sort((prev, next) => next.info.height - prev.info.height)
        height = tempArr[0].info.height
      }
    } else {
      const sliceArr = tempArr.slice(
        swipe.active,
        swipe.active + swipe.itemNums
      )
      sliceArr.sort((prev, next) => next.info.height - prev.info.height)

      height = sliceArr[0].info.height
    }

    swipe.setHeight(height)
  }

  updatePagination() {
    this.swipe.maxActiveCount = this.swipe.getMaxActiveCount()
    if (this.opts.pagination) {
      this.swipe.setPagination(this.swipe.maxActiveCount, this.active)
    }
  }

  updateSortedItems() {
    this.swipe.sortedItems = this.swipe.getItemsBySort()
  }

  getColumnNum() {
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
    const itemNums = this.itemNums || this.opts.itemNums
    return (this.api.width - this.gutter * (itemNums - 1)) / itemNums
  }

  handleMultipleItemLocation(swipe) {
    if (this.model === 'nested') {
      this.handelMultipleNested(swipe)
    } else {
      this.handelMultipleBase(swipe)
    }
  }

  handelMultipleBase(swipe) {
    const arrLength = [0, 0]
    const tempArr = [[], []]
    const height = this.api.chunks[0].info.height

    this.api.chunks.forEach(chunk => {
      const config = {
        x: 0,
        y: 0
      }

      const shortIndex = arrLength[0] > arrLength[1] ? 1 : 0
      const prevChunk = tempArr[shortIndex][tempArr[shortIndex].length - 1]

      if (prevChunk) {
        config.x = arrLength[shortIndex]
      }

      if (shortIndex % 2) {
        config.y = height + this.gutter
      }

      tempArr[shortIndex].push(config)
      chunk.movePosition = config
      chunk.info = Object.assign({}, chunk.info, config)
      arrLength[shortIndex] =
        chunk.movePosition.x + chunk.info.width + this.gutter
    })

    const lastChunk = Math.max(arrLength[0], arrLength[1])
    swipe.setWidth(lastChunk - this.gutter)
  }

  handelMultipleNested(swipe) {
    this.nestedArr = []
    let width = 0
    const firstChunk = this.api.chunks[0]

    const baseWidth =
      (firstChunk.info.width + this.gutter) / firstChunk.col - this.gutter
    const baseHeight = baseWidth / firstChunk.aspectRatio
    this.api.chunks.forEach(chunk => {
      const config = this.getNestedItemLocation(chunk, baseWidth, baseHeight)

      chunk.movePosition = config
      chunk.info = Object.assign({}, chunk.info, config)
      width = Math.max(width, chunk.movePosition.x + chunk.info.width)
    })

    swipe.setWidth(width)
  }

  getNestedItemLocation(chunk, baseWidth, baseHeight) {
    const { col, row } = chunk
    const config = {
      x: 0,
      y: 0
    }

    if (!this.nestedArr.length) {
      this.setNestedArr(
        {
          colStart: 0,
          rowStart: 0
        },
        col,
        row
      )
      return config
    }

    for (let colIndex = 0; colIndex < this.nestedArr.length; colIndex++) {
      for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
        if (this.isEmpty(rowIndex, colIndex)) {
          if (row === 2) {
            if (rowIndex === 1) {
              continue
            }

            if (!this.isEmpty(rowIndex + 1, colIndex)) {
              continue
            }
          }

          if (col === 2 && !this.isEmpty(rowIndex, colIndex + 1)) {
            continue
          }

          this.setNestedArr(
            {
              rowStart: rowIndex,
              colStart: colIndex
            },
            col,
            row
          )

          config.x = colIndex * (baseWidth + this.gutter)
          config.y = rowIndex * (baseHeight + this.gutter)

          return config
        }
      }
    }

    return config
  }

  isEmpty(row, col) {
    if (row > 1) {
      return false
    }

    if (col >= this.nestedArr.length) {
      return true
    }

    return !this.nestedArr[col][row]
  }

  setNestedArr(location, col, row) {
    const { colStart, rowStart } = location

    for (let colIndex = 0; colIndex < col; colIndex++) {
      for (let rowIndex = 0; rowIndex < row; rowIndex++) {
        if (this.nestedArr.length >= colStart + colIndex) {
          this.nestedArr.push([])
        }

        this.nestedArr[colStart + colIndex][rowStart + rowIndex] = true
      }
    }
  }
}

export default Carousel
