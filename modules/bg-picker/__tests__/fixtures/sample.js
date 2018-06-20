import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <input type="text"
        class="example-default"
        value="{
        'repeat':'repeat-x',
        'position':'center center',
        'attachment':'inherit',
        'image': 'http://via.placeholder.com/350x150'
        }" />
`
