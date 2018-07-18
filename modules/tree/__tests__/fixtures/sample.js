import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<div class="files">
  <ul>
    <li>
      <div>branch 1</div>
      <ul>
        <li>leaf 1</li>
        <li>leaf 2</li>
        <li>leaf 3</li>
      </ul>
    </li>
    <li id="test">
      <div>branch 2</div>
      <ul>
        <li>leaf 4</li>
        <li>leaf 5</li>
        <li>leaf 6</li>
        <li id="test2">
          <div>branch 3</div>
          <ul>
            <li id="test3">leaf 7</li>
            <li>leaf 8</li>
            <li>leaf 9</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>leaf 19</li>
  </ul>
</div>
`
