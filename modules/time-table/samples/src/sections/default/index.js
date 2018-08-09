import { query } from '@pluginjs/dom'
import TimeTable from '@pluginjs/time-table'

const element = query('#default .example-delault')
const datas = [
  {
    id: '10000',
    start: '2017-12-07 09:30',
    end: '2017-12-07 12:00',
    content: 'this is content',
    class: 'Design Track',
    title: 'Yoga'
  },
  {
    id: '10000',
    start: '2017-12-07 11:30',
    end: '2017-12-07 15:00',
    content: 'this is content',
    class: 'Design Track',
    title: 'Zumba'
  },
  {
    id: '10000',
    start: '2017-12-07 13:30',
    end: '2017-12-07 17:30',
    content: 'this is content',
    class: 'IT Pro Track',
    title: 'Hip Hop'
  },
  {
    id: '10000',
    start: '2017-12-07 13:30',
    end: '2017-12-07 17:30',
    content: 'this is content',
    class: 'IT Pro Track',
    title: 'Hip Hop'
  },
  {
    id: '10000',
    start: '2017-12-07 13:30',
    end: '2017-12-07 17:30',
    content: 'this is content',
    class: 'IT Pro Track',
    title: 'Hip Hop'
  },
  {
    id: '10001',
    start: '2017-12-9 12:30',
    end: '2017-12-9 18:20',
    content: 'this is content',
    class: 'IT Pro Track',
    title: 'Yoga'
  },
  {
    id: '10001',
    start: '2017-12-10 12:30',
    end: '2017-12-9 18:20',
    content: 'this is content',
    class: 'IT Pro Track',
    title: 'Yoga'
  },
  {
    id: '10001',
    start: '2017-12-9 12:30',
    end: '2017-12-9 18:20',
    content: 'this is content',
    class: 'IT Pro Track',
    title: 'Yoga'
  },
  {
    id: '10002',
    start: '2017-9-7 00:30',
    end: '2017-9-7 20:20',
    content: 'this is content',
    class: 'Marketer Track',
    title: 'Zumba'
  },
  {
    id: '10003',
    start: '2017-12-3 10:30',
    end: '2017-12-4 12:20',
    content: 'this is content',
    class: 'Design Track',
    title: 'Hip Hop'
  },
  {
    id: '10007',
    start: '2017-11-27 09:30',
    end: '2017-11-27 12:20',
    content: 'this is content',
    class: 'Design Track',
    title: 'Zumba'
  },
  {
    id: '10008',
    start: '2017-11-28 09:30',
    end: '2017-11-28 11:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Hip Hop'
  },
  {
    id: '10009',
    start: '2017-11-29 11:30',
    end: '2017-11-29 16:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Yoga'
  },
  {
    id: '10010',
    start: '2017-11-29 10:30',
    end: '2017-11-29 14:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Hip Hop'
  },
  {
    id: '10011',
    start: '2017-11-30 09:30',
    end: '2017-11-30 14:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Zumba'
  },
  {
    id: '10011',
    start: '2018-9-30 09:30',
    end: '2018- 9-30 14:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Zumba'
  },
  {
    id: '10011',
    start: '2018-9-30 09:30',
    end: '2018- 9-30 14:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Zumba'
  },
  {
    id: '10011',
    start: '2018-9-30 09:30',
    end: '2018- 9-30 14:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Zumba'
  },
  {
    id: '10011',
    start: '2018-9-30 09:30',
    end: '2018- 9-30 14:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Zumba'
  },
  {
    id: '10011',
    start: '2018-9-30 09:30',
    end: '2018- 9-30 14:20',
    content: 'this is content',
    class: 'Workshop Track',
    title: 'Zumba'
  }
]
TimeTable.of(element, { data: datas })
