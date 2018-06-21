import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <input class="example-input" type="text" value='[{"title": "Interfaces","checked":false},{"title":"UI Design", "checked": true}]'>
`
