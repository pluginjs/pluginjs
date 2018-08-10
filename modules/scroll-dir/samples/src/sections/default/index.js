import { query } from '@pluginjs/dom'
import ScrollDir from '@pluginjs/scroll-dir'

const handler = (dir, currentScrollY, delta) =>
  console.info('scrolldir: ', dir, delta)

query('#default .api-attach').addEventListener('click', () =>
  ScrollDir.on(handler)
)

query('#default .api-detach').addEventListener('click', () =>
  ScrollDir.off(handler)
)
