import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<div class="section-container">
  <section id="home" class="section">
    <div class="inner">
      <h1 class="section-title">Home</h1>
    </div>
  </section>
  <section id="section-1" class="section">
    <div class="inner">
      <h2 class="section-title">Section 1</h2>
    </div>
  </section>
  <section id="section-2" class="section">
    <div class="inner">
      <h2 class="section-title">Section 2</h2>
    </div>
  </section>
  <section id="section-3" class="section">
    <div class="inner">
      <h2 class="section-title">Section 3</h2>
    </div>
  </section>
</div>
`
