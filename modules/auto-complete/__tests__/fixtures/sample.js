import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <h3>Simple Array</h3>
    <input class="auto-complete-basic" data-bool="false" data-number="1" data-data="['JAVA', 'Java Script', 'Go', 'Swift', 'C++', '易语言', 'C#', 'Python', 'Ruby']"></input>
`
