import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="#">Home</a></li>
<li class="breadcrumb-item"><a href="#">Getting Started</a></li>
<li class="breadcrumb-item"><a href="#">Library</a></li>
<li class="breadcrumb-item"><a href="#">Document</a></li>
<li class="breadcrumb-item"><a href="#">Components</a></li>
<li class="breadcrumb-item"><a href="#">JavaScript</a></li>
<li class="breadcrumb-item"><a href="#">Customize</a></li>
<li class="breadcrumb-item active">Data</li>
</ol>`
