# TimeTable

[![npm package](https://img.shields.io/npm/v/@pluginjs/time-table.svg)](https://www.npmjs.com/package/@pluginjs/time-table)

A flexible modern time-table js plugin.

**[Samples](https://codesandbox.io/s/github/pluginjs/plugin.js/tree/master/modules/timeTable/samples)**

## Introduction

### Installation

#### Yarn

```javascript
yarn add @pluginjs/time-table
```

#### NPM

```javascript
npm i @pluginjs/time-table
```

---

## Getting Started

**CDN:**

Development:

```html
<script src="https://unpkg.com/@pluginjs/time-table/dist/time-table.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/time-table/dist/time-table.css">
```

Production:

```html
<script src="https://unpkg.com/@pluginjs/time-table/dist/time-table.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@pluginjs/time-table/dist/time-table.min.css">
```

### Initialize

HTML:

```html
<body>
  <div class="element"></div>
</body>
```

ECMAScript Module:

```javascript
import TimeTable from "@pluginjs/time-table"
import "@pluginjs/time-table/dist/time-table.css"

TimeTable.of(document.querySelector('.element'), options)
```

CommonJS:

```javascript
require("@pluginjs/time-table/dist/time-table.css")
const TimeTable = require("@pluginjs/time-table")

TimeTable.of(document.querySelector('.element'), options)
```

Browser:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pluginjs/time-table/dist/time-table.css">
  <script async src="https://unpkg.com/@pluginjs/time-table/dist/time-table.js"></script>
</head>
```

```javascript
Pj.timeTable('.element', options);
```

---

## API

### Options

Options are called on timeTable instances through the timeTable options itself.
You can also save the instances to variable for further use.

Name | Description | Default
-----|--------------|-----
`"locale"` | Set locale environment | `en`
`"data"` | Set data | `null`
`"view"` | Set view | `monthly`
`"templates"` | Set default templates | `{}`
`"listly"` | Set listly | `{&quot;controllerLabel&quot;:[&quot;DD MMM&quot;,&quot;- DD MMM ,YYYY&quot;],&quot;headerLabel&quot;:&quot;MMMM DD, YYYY&quot;,&quot;eventLabel&quot;:[&quot;HH:mm&quot;,&quot;-HH:mm&quot;]}`
`"weekly"` | Set weekly | `{&quot;controllerLabel&quot;:[&quot;MMM DD &quot;,&quot;- MMM DD, YYYY&quot;],&quot;headerLabel&quot;:&quot;ddd,DD MMM&quot;,&quot;timeBetween&quot;:&quot;09:00-19:30&quot;}`
`"monthly"` | Set monthly | `{&quot;controllerLabel&quot;:&quot;MMM YYYY&quot;,&quot;eventLabel&quot;:&quot;HH:mm&quot;}`

### Events

Events are called on timeTable instances through the timeTable events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"enable"` | Gets fired when plugin has enabled
`"editable"` | Gets fired when plugin has editable
`"click"` | Gets fired when plugin has click
`"detail"` | Gets fired when plugin has detail

### Methods

Methods are called on timeTable instances through the timeTable method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
`"get"` | Get value by key
`"set"` | Set value by key
`"val"` | Set or get value by key
`"enable"` | Enabled plugin if plugin is disabled
`"disable"` | Disable plugin
`"destroy"` | Destroy plugin

### Classes

Name | Description | Default
-----|------|------
`"NAMESPACE"` | Declare plugin namespace | `pj-timeTable`
`"INIT"` | Declare plugin init | `{namespace}-init`
`"DETAIL"` | Declare plugin month-detail | `{namespace}-month-detail`
`"ACTIVE"` | Announce plugin is actived | `{namespace}-active`
`"THEME"` | Declare plugin theme | `{namespace}--{theme}`
`"DISABLED"` | Announce plugin is disabled | `{namespace}-disabled`
`"DATA"` | Declare plugin data | `{namespace}-data`
`"WEBVIEW"` | Declare plugin webview | `{namespace}-webview`
`"DATEPICKER"` | Declare plugin datePicker | `{namespace}-datePicker`
`"WEEK"` | Declare plugin weekly | `{namespace}-weekly`
`"BASELINE"` | Declare plugin baseline | `{namespace}-baseline`
`"EVENTWRAP"` | Declare plugin event-wrap | `{namespace}-event-wrap`
`"AFFAIR"` | Declare plugin affair | `{namespace}-affair`
`"OTHERMONTH"` | Declare plugin other badge | `{namespace}-other-badge`
`"CLASSIFY"` | Declare plugin classify | `{namespace}-classify`
`"ITEM"` | Declare plugin classify item | `{namespace}-classify-item`
`"TEXT"` | Declare plugin controller text | `{namespace}-controller-text`
`"CONTROL"` | Declare plugin controller | `{namespace}-controller`
`"ARROW"` | Declare plugin arrow | `{namespace}-arrow`
`"PREVIEW"` | Declare plugin controller preview | `{namespace}-controller-preview`
`"NEXT"` | Declare plugin controller next | `{namespace}-controller-next`
`"VIEW"` | Declare plugin view | `{namespace}-view`
`"HIDE"` | Declare plugin hide | `{namespace}-hide`
`"MONTH"` | Declare plugin monthly | `{namespace}-monthly`
`"LIST"` | Declare plugin listly | `{namespace}-listly`
`"HEADER"` | Declare plugin header | `{namespace}-header`
`"EDIT"` | Declare plugin edit | `{namespace}-edit`
`"EVENTSGROUP"` | Declare plugin events group | `{namespace}-events-group`
`"EVENTS"` | Declare plugin events events | `{namespace}-events`
`"WEEKEVENT"` | Declare plugin weekEvent | `{namespace}-weekEvent`
`"WEEKEVENTTIME"` | Declare plugin weekEvent time | `{namespace}-weekEvent-time`
`"WEEKEVENTTITLE"` | Declare plugin weekEvent title | `{namespace}-weekEvent-title`
`"ACTIVEWEEKEVENT"` | Declare plugin weekEvent active | `{namespace}-weekEvent-active`
`"WEEKEVENTWRAP"` | Declare plugin weekEvent wrap | `{namespace}-weekEvent-wrap`
`"OVERLAY"` | Declare plugin overlay | `{namespace}-overlay`
`"SMOVERLAY"` | Declare plugin sm overlay | `{namespace}-sm-overlay`
`"MONTHEVENT"` | Declare plugin monthly event | `{namespace}-monthly-event`
`"MONTHEVENTSWRAP"` | Declare plugin monthEvents wrap | `{namespace}-monthEvents-wrap`
`"MONTHEVENTWRAP"` | Declare plugin month eventwrap | `{namespace}-month-eventwrap`
`"MONTHSHOWLIST"` | Declare plugin month showList | `{namespace}-month-showList`
`"MONTHSINGLEEVENT"` | Declare plugin month singleEvent | `{namespace}-month-singleEvent`
`"BADGE"` | Declare plugin badge | `{namespace}-badge`
`"MONTHEVENTMORE"` | Declare plugin monthEvent more | `{namespace}-monthEvent-more`
`"MONTHEVENTTIME"` | Declare plugin monthEvent time | `{namespace}-monthEvent-time`
`"MONTHEVENTTITLE"` | Declare plugin monthEvent title | `{namespace}-monthEvent-title`
`"HIGHHEIGHT"` | Declare plugin high height | `{namespace}-high-height`
`"LISTEVENTWRAP"` | Declare plugin listEvent wrap | `{namespace}-listEvent-wrap`
`"LISTEVENTHEAD"` | Declare plugin listEvent head | `{namespace}-listEvent-head`
`"LISTEVENTITEM"` | Declare plugin listEvent item | `{namespace}-listEvent-item`
`"LISTEVENTTIME"` | Declare plugin listEvent time | `{namespace}-listEvent-time`
`"LISTEVENTTITLE"` | Declare plugin listEvent title | `{namespace}-listEvent-title`
`"LISTEVENTCONTENT"` | Declare plugin listEvent content | `{namespace}-listEvent-content`
`"LISTEVENTITEMWRAP"` | Declare plugin listEvent item wrap | `{namespace}-listEvent-item-wrap`

### Translations

Name | EN | ZH
-----|------|-------
`"weekday"` | Sun,Mon,Tue,Wed,Thu,Fri,Sat | 周日,周一,周二,周三,周四,周五,周六
`"month"` | [object Object] | [object Object]
`"fullWeek"` | Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday | 星期一,星期二,星期三,星期四,星期五,星期六,星期日
`"fullMonth"` | [object Object] | [object Object]
`"choice"` | [object Object] | [object Object]
`"today"` | today | 今日
`"add"` | ADD EVENT | 添加事项
`"all"` | All Classes | 全部
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ |

## License

@pluginjs/time-table is Licensed under [the GPL-v3 license](LICENSE).If you want to use @pluginjs/time-table project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 Creation Studio Limited.