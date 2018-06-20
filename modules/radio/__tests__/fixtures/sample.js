import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <h3>Inline</h3>
    <div class="example">
        <input class="example-inline" type="radio" name="js-inline" id="js-inline-foo" value="foo" data-theme="inline" checked="checked" />
        <label for="js-inline-foo"><i></i> Foo</label>
        <input class="example-inline" type="radio" name="js-inline" id="js-inline-bar" value="bar" data-theme="inline"  />
        <label for="js-inline-bar"><i></i> Bar</label>
        <input class="example-inline" type="radio" name="js-inline" id="js-inline-baz" value="baz" data-theme="inline" />
        <label for="js-inline-baz"><i></i> Baz</label>
    </div>
`
