import { html as render, query } from '@pluginjs/dom'
// import html from './index.html'
import Accordion from '@pluginjs/accordion'

const html = `
<h2>horizontal</h2>
<ul class="accordion pj-accordion pj-accordion--default" data-horizontal="true">
  <li class="pj-accordion-pane pj-accordion-active">
    <div class="pj-accordion-pane-header">Section 1</div>
    <div class="pj-accordion-pane-content">
      <div class="pj-accordion-pane-content-inner">
        This's section 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing elit. Fusce veli tortor.
      </div>
    </div>
  </li>
  <li class="pj-accordion-pane">
    <div class="pj-accordion-pane-header">Section 2</div>
    <div class="pj-accordion-pane-content">
      <div class="pj-accordion-pane-content-inner">
        This's section 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing elit. Fusce veli tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </div>
  </li>
  <li class="pj-accordion-pane">
    <div class="pj-accordion-pane-header">Section 3</div>
    <div class="pj-accordion-pane-content">
      <div class="pj-accordion-pane-content-inner">
        This's section 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing elit. Fusce veli tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </div>
  </li>
</ul>`

const element = query('.accordion', render(html, query('#horizontal')))
Accordion.of(element, {
  /** options **/
})
