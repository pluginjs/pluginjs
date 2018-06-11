import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <h4>Inline</h4>
    <div class="example">
            <input type="checkbox" name="js-inline[]" id="js-inline-foo" value="foo" data-theme="inline" checked="checked" />
            <label for="js-inline-foo"><i class="icon-check-mini"></i> Foo</label>
            <input type="checkbox" name="js-inline[]" id="js-inline-bar" value="bar" data-theme="inline"  />
            <label for="js-inline-bar"><i class="icon-check-mini"></i> Bar</label>
            <input type="checkbox" name="js-inline[]" id="js-inline-baz" value="baz" data-theme="inline" />
            <label for="js-inline-baz"><i class="icon-check-mini"></i> Baz</label>
    </div>
`
