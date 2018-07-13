import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<div class="pj-svgProgress-circle" role="progressbar" data-goal="100" aria-valuemin="0" aria-valuemax="100">
  <span class="pj-svgProgress-number">0%</span>
</div>
`
