import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <form>
        <div class="form-group">
        <input type="password" class="password-input form-control" name="password" value="" />
        </div>
    </form>
`
