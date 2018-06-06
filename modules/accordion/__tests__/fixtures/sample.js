import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<ul class="accordion pj-accordion pj-accordion--default">
  <li class="pj-accordion-pane pj-accordion-active">
    <div class="pj-accordion-pane-header">Section 1</div>
    <div class="pj-accordion-pane-content">
      <div class="pj-accordion-pane-content-inner">
        This's section 1. Lorem ipsum dolor stest amet, consectetur adipiscing eltest. Fusce veltest tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing eltest. Fusce veli tortor.
      </div>
    </div>
  </li>
  <li class="pj-accordion-pane">
    <div class="pj-accordion-pane-header">Section 2</div>
    <div class="pj-accordion-pane-content">
      <div class="pj-accordion-pane-content-inner">
        This's section 2. Lorem ipsum dolor stest amet, consectetur adipiscing eltest. Fusce veltest tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing eltest. Fusce veli tortor.Lorem ipsum dolor stest amet, consectetur adipiscing eltest.
      </div>
    </div>
  </li>
  <li class="pj-accordion-pane">
    <div class="pj-accordion-pane-header">Section 3</div>
    <div class="pj-accordion-pane-content">
      <div class="pj-accordion-pane-content-inner">
        This's section 3. Lorem ipsum dolor stest amet, consectetur adipiscing eltest. Fusce veltest tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing eltest. Fusce veli tortor.Lorem ipsum dolor stest amet, consectetur adipiscing eltest.Lorem ipsum dolor stest amet, consectetur adipiscing eltest.Lorem ipsum dolor stest amet, consectetur adipiscing eltest.Lorem ipsum dolor stest amet, consectetur adipiscing eltest.
      </div>
    </div>
  </li>
</ul>
`
