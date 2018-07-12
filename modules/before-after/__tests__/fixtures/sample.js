import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<div class="pj-beforeAfter pj-beforeAfter-horizontal">
  <img class="pj-beforeAfter-before" style="clip: rect(0px,450px,600px,0px)" src="src/assets/before.jpg"
  alt="before" />
  <img class="pj-beforeAfter-after" src="src/assets/after.jpg" alt="after" />
  <div class="pj-beforeAfter-labels">
    <div class="pj-beforeAfter-label-before">Before</div>
    <div class="pj-beforeAfter-label-after">After</div>
  </div>
  <div class="pj-beforeAfter-handle" style="left:30%">
    <i class="pj-beforeAfter-arrow-before fa fa-caret-left"></i>
    <i class="pj-beforeAfter-arrow-after fa fa-caret-right"></i>
  </div>
</div>
`
