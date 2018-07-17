import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<ul>
  <li><a href="index.html">Home</a></li>
  <li>
    <a href="">Categories</a>
    <ul>
      <li><a href="">Category 1</a></li>
      <li><a href="">Category 2</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Page</a>
    <ul>
      <li><a href="">Page 1</a></li>
      <li><a href="">Page 2</a></li>
    </ul>
  </li>
  <li><a href="http://google.com">External</a></li>
  <li><a href="#top">Go to top</a></li>
</ul>
`
