import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <h3>Data Attributes</h3>
    <p>Any option of the asDatepicker can also be set via data-attributes.</p>
    <p>Such as:</p>
    <input type="text" id="calendar-attributes" data-mode="range" data-selectable-year="2001>2010,2012,2014>2018" readonly="readonly">
`
