export const namespace = 'infinite'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  LOADING: 'loading',
  NOMOREDATA: 'noMoreData',
  EXCEPTEERROR: 'excepteError',
  ENABLE: 'enable',
  DISABLE: 'disable'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}-container',
  LOADER: '{namespace}-loader',
  LOADING: '{namespace}-loading',
  NOMOREDATA: '{namespace}-noMoreData',
  EXCEPTION: '{namespace}-exception',
  DISABLED: '{namespace}-disabled'
}

export const methods = ['destroy', 'disable', 'enable']

export const defaults = {
  locale: 'en',
  templates: {
    loading() {
      return '<div class="{classes.LOADING}">{label}</div>'
    },
    noMoreData() {
      return '<div class="{classes.NOMOREDATA}">{label}</div>'
    },
    exception() {
      return '<div class="{classes.EXCEPTION}">{label}</div>'
    }
  },
  threshold: 0, // top of under
  loadMore(infinite) {
    infinite.loader.appendEnd()
  }
}

export const dependencies = ['scrollEnd']

export const translations = {
  en: {
    loading: 'loading...',
    noMoreData: 'There are no more pages left to load.',
    exception: 'Except Error'
  },
  zh: {
    loading: '加载中...',
    noMoreData: '没有更多的页面可以加载.',
    exception: '异常错误'
  }
}
