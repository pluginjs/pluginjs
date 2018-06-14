import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <input type="text" id="calendar-attributes" data-mode="range" data-selectable-year="2001>2010,2012,2014>2018" readonly="readonly">
`
