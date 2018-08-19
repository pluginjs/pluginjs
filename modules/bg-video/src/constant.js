import Video from '@pluginjs/video'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'bgVideo'

export const events = deepMerge(Video.events, {})

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  WRAP: '{namespace}-wrap',
  THEME: '{namespace}--{theme}',
  POSTER: '{namespace}-poster',
  POSTERHIDE: '{namespace}-poster-hide',
  OVERLAY: '{namespace}-overlay'
}

export const methods = deepMerge(Video.methods, {})

export const defaults = deepMerge(Video.defaults, {
  autoplay: true,
  loop: true,
  muted: true,
  controls: false,
  overlay: true
})
export const dependencies = ['video']
