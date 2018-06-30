import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <div class="example">
            <input type="checkbox" name="js-inline[]" id="js-inline-baz" value="baz" data-theme="inline" />
            <label for="js-inline-baz"><i class="icon-check-mini"></i> Baz</label>
    </div>
`
