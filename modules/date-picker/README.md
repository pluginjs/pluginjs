# DatePicker

[![npm package](https://img.shields.io/npm/v/@pluginjs/date-picker.svg)](https://www.npmjs.com/package/@pluginjs/date-picker)

A flexible modern date-picker js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/pluginjs/tree/master/modules/datePicker/samples)**

## Introduction
### Installation

#### Yarn

```javascript
yarn add @pluginjs/date-picker
```

#### NPM

```javascript
npm i @pluginjs/date-picker
```

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/date-picker/dist/date-picker.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/date-picker/dist/date-picker.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/date-picker/dist/date-picker.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/date-picker/dist/date-picker.min.css">
```

### Initialize

HTML:

```html
<div class="element"></div>
```

ECMAScript Module:

```javascript
import DatePicker from "@pluginjs/date-picker"
import "@pluginjs/date-picker/dist/date-picker.css"

DatePicker.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/date-picker/dist/date-picker.css")
const DatePicker = require("@pluginjs/date-picker")

DatePicker.of(document.querySelector('.element'), options)
```

Browser:

```html
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/date-picker/dist/date-picker.css">
<script src="https://unpkg.com/@pluginjs/date-picker/dist/date-picker.js"></script>
<script>
  Pj.datePicker('.element', options)
</script>
```

## API

### Options

Options are called on datePicker instances through the datePicker options itself.
You can also save the instances to variable for further use.

Name | Description | Default
--|--|--
`"theme"` | Set plugin theme option | `null`
`"firstDayOfWeek"` | Set plugin first day of week option | `0`
`"mode"` | Set mode | `single`
`"displayMode"` | Set display mode | `dropdown`
`"calendars"` | Set calendars | `1`
`"date"` | Set date | `today`
`"keyboard"` | Set plugin keyboard event | `true`
`"rangeSeparator"` | Set plugin range separator | `to`
`"multipleSeparator"` | Set multip separator | `,`
`"multipleSize"` | Set multiple size | `5`
`"disabled"` | Disabled plugin | `false`
`"container"` | Set plugin container | `body`
`"position"` | Set position | `bottom`
`"alwaysShow"` | Set plugin is alwaysShow or not | `false`
`"onceClick"` | Set plugin is onceClick or not | `false`
`"min"` | Set value of min | `null`
`"max"` | Set value of max | `null`
`"selectableDate"` | Set value of selectableDate | `[]`
`"selectableYear"` | Set value of selectableYear | `[]`
`"selectableMonth"` | Set value of selectableMonth | `[]`
`"selectableDay"` | Set value of selectableDay | `[]`
`"selectableDayOfWeek"` | Set value of selectableDayofWeek | `[]`
`"locale"` | Set locale environment | `en`
`"localeFallbacks"` | Set plugin is localeFallbacks or not | `true`
`"views"` | Set view | `["days"]`
`"outputFormat"` | Set outputForm | `yyyy/mm/dd`
`"mobileMode"` | Set mobileMode | `false`
`"constrainToWindow"` | Set plugin is  contrainToWindow or not | `true`
`"constrainToScrollParent"` | Set plugin is  contrainToScrollParent or not | `true`
`"constraints"` | Set constraints | `[]`
`"templates"` | Set default templates | `{}`
`"process"` | The type of object change the type of JSON | `function() {...}`
`"parse"` | The type of JSON change the type of object | `function() {...}`

### Events

Events are called on datePicker instances through the datePicker events itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"change"` | Gets fired when plugin has changed
`"ready"` | Gets fired when plugin has ready
`"enable"` | Gets fired when plugin has enabled
`"disable"` | Gets fired when plugin has disabled
`"destroy"` | Gets fired when plugin has destroy
`"beforeShow"` | BeforeShow of event that triggered the selected element
`"beforeHide"` | Hide of event that triggered the selected element
`"show"` | Gets fired when plugin has show
`"hide"` | Gets fired when plugin has hide

### Methods

Methods are called on datePicker instances through the datePicker method itself.
You can also save the instances to variable for further use.

Name | Description
--|--
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin
`"update"` | Update plugin
`"reset"` | Reset olugin
`"multipleClear"` | multiple clear plugin
`"getInput"` | Get value of getInput
`"getDate"` | Get value of getDate
`"getWrap"` | Get value of getWrap
`"show"` | Show plugin if it is hiden
`"hide"` | Hide plugin
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key

### Classes

Name | Description | Default
--||
`"NAMESPACE"` | Declare plugin namespace | `pj-datePicker`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"INPUT"` | Declare plugin input | `{namespace}-input`
`"ICON"` | Declare plugin icon | `{namespace}-icon`
`"COVER"` | Declare plugin cover | `{namespace}-cover`
`"ISMOBILE"` | Declare plugin ismobile | `{namespace}-isMobile`
`"CONTENT"` | Declare plugin content | `{namespace}-content`
`"PREV"` | Declare prev element | `{namespace}-prev`
`"NEXT"` | Declare next element | `{namespace}-next`
`"CAPTION"` | Declare plugin caption | `{namespace}-caption`
`"DATS"` | Declare plugin dats | `{namespace}-days`
`"MONTHS"` | Declare plugin months | `{namespace}-months`
`"YEARS"` | Declare plugin years | `{namespace}-years`
`"ISDAYS"` | Declare plugin isdays | `{namespace}-isDays`
`"ISMONTHS"` | Declare plugin ismonths | `{namespace}-isMonths`
`"ISYEARS"` | Declare plugin isyears | `{namespace}-isYears`
`"OTHERMONTH"` | Declare plugin othermonth | `{namespace}-otherMonth`
`"FOCUS"` | Declare plugin focus | `{namespace}-focus`
`"BUTTONS"` | Declare plugin buttons | `{namespace}-buttons`
`"BUTTONCANCELS"` | Declare plugin buttonCancels | `{namespace}-button-cancel`
`"BUTTONSAVES"` | Declare plugin button saves | `{namespace}-button-save`
`"SHOW"` | Announce plugin is show | `{namespace}-show`
`"HEAD"` | Declare plugin head | `{namespace}-head`
`"HEADER"` | Declare plugin header | `{namespace}-header`
`"BODY"` | Declare plugin body | `{namespace}-body`
`"ROW"` | Declare plugin row | `{namespace}-row`
`"BLOCKED"` | Declare plugin blocked | `{namespace}-blocked`
`"UNTOUCHABLE"` | Declare plugin untouchable | `{namespace}-untouchable`
`"INRANGE"` | Declare plugin inrange | `{namespace}-inRange`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"INLINEMODE"` | Declare plugin inlinemode | `{namespace}-inline`
`"PICKERWRAP"` | Declare plugin pickerwrap | `{namespace}-picker-wrap`

### Translations

Name | EN | ZH
--||-
`"days"` | Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday | 周日,周一,周二,周三,周四,周五,周六
`"daysShort"` | Su,Mo,Tu,We,Th,Fr,Sa,Su | 日,一,二,三,四,五,六,日
`"months"` | January,February,March,April,May,June,July,August,September,October,November,December | 一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月
`"monthsShort"` | Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec | 1,2,3,4,5,6,7,8,9,10,11,12
`"buttons"` | Cancel,Save | 取消,保存

## Browser support

Tested on all major browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## License

@pluginjs/date-picker is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs/date-picker project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).