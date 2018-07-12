import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<div class="pj-hotspots pj-hotspots-css pj-hotspots-full">
    <img src="../assets/car.jpg" alt=""/>
    <div class="pj-hotspot pj-hotspot-icon" style="left: 61%; top: 68%" title="18' wheels" data-content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.">
      <span class="fa fa-map-marker"></span>
    </div>
    <div class="pj-hotspot pj-hotspot-dot" style="left: 35%; top: 45%" title="TFSI® engine" data-content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.">
    </div>
    <div class="pj-hotspot pj-hotspot-bordered pj-hotspot-icon" style="left: 38%; top: 53%" title="LED Headlights" data-content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.">
      <span class="fa fa-map-marker"></span>
    </div>
    <div class="pj-hotspot pj-hotspot-solid pj-hotspot-icon" style="left: 27%; top: 60%" data-placement="bottom" title="Singleframe® grille" data-content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.">
      <span class="fa fa-map-marker"></span>
    </div>
    <div class="pj-hotspot pj-hotspot-solid pj-hotspot-shadow pj-hotspot-icon" style="left: 75%; top: 30%" title="S line® exterior" data-content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.">
      <span class="fa fa-map-marker"></span>
    </div>
</div>
`
