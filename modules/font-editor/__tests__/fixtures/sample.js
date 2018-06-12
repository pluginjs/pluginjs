import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <h3>Default</h3>
    <input type="text" class="example-default" value="{'fontFamily': 'Arial'}">
`
