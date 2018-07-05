import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<div class="countdown" data-mode="ordinary" data-due="2018-11-22 8:10:50" data-format="Y,M,DM,h,m,s" data-site="above" data-label="年，月，天，时，分，秒">
</div>
`
