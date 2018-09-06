import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <div class="example">
    <input type="checkbox" name="js-inline[]" id="js-inline-foo" value="foo" checked="checked" />
    <label for="js-inline-foo"><i class="icon-check-mini"></i> Foo</label>
    </div>
`
