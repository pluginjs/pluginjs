import { query } from '@pluginjs/dom'
import Infinite from '@pluginjs/infinite'

let loadedMockDataCount = 1
const pluginElement = query('.container')
const instance = Infinite.of(pluginElement, {
  negativeMargin: 100,
  loadMore(infinite) {
    if (loadedMockDataCount === 3) {
      infinite.noMoreDate()
      return
    }
    fetch(
      `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=${loadedMockDataCount}`
    )
      .then(res => res.json())
      .then(data => {
        infinite.appendDate(
          Array.from({ length: 20 })
            .fill(data.data[0].desc)
            .join('<br>')
        )
        loadedMockDataCount++
      })
      .catch(() => {
        infinite.throwException()
      })
  },
  onLoading() {
    console.log('onLoading', 'event')
  },
  onNoMoreData() {
    console.log('onNoMoreData', 'event')
  },
  onExcepteError() {
    console.log('onExcepteError')
  },
  onDestroy() {
    console.log('destroy', 'event')
  },
  onReady() {
    console.log('ready', 'event')
  }
})

query('.api-destroy').addEventListener('click', () => {
  instance.destroy()
})
