import { query } from '@pluginjs/dom'
import ScrollEnd from '@pluginjs/scroll-dir'

const handler = () => console.log('scrollend')

query('#default .api-attach').addEventListener('click', () =>
  ScrollEnd.on(handler)
)

query('#default .api-detach').addEventListener('click', () =>
  ScrollEnd.off(handler)
)
