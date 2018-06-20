import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <input type="text" class="example-default" value="{'fontFamily': 'Arial'}">
`
