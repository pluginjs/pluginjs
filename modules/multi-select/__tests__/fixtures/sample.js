import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<select multiple="multiple" class="example">
  <optgroup label="Group One">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </optgroup>
  <optgroup label="Group Two">
    <option value="3">Option 3</option>
    <option value="4" selected="selected">Option 4</option>
    <option value="5">Option 5</option>
  </optgroup>
</select>
`
