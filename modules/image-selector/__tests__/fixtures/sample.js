import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<select class="example-default">
  <optgroup label="group-one">
    <option value="a">beijing</option>
    <option value="b" selected>fujian</option>
  </optgroup>
  <optgroup label="group-two">
    <option value="c">zhejiang</option>
    <option value="d">tianjin</option>
    <option value="e">shanghai</option>
  </optgroup>
</select>
`
