import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<header id="main-header" class="fixed-header">
  <nav>
    <ul>
      <li class="active"><a href="#home">Home</a></li>
      <li><a href="#section-1">Section 1</a></li>
      <li><a href="#section-2">Section 2</a></li>
      <li><a href="#section-3">Section 3</a></li>
    </ul>
  </nav>
</header>
`
