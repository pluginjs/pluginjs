import { query } from '@pluginjs/dom'
import Gallery from '@pluginjs/gallery'

const data = [
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=1',
    thumb: 'https://picsum.photos/160/90?image=1'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=2',
    thumb: 'https://picsum.photos/160/90?image=2'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=3',
    thumb: 'https://picsum.photos/160/90?image=3'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=4',
    thumb: 'https://picsum.photos/160/90?image=4'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=5',
    thumb: 'https://picsum.photos/160/90?image=5'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=6',
    thumb: 'https://picsum.photos/160/90?image=6'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=7',
    thumb: 'https://picsum.photos/160/90?image=7'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=8',
    thumb: 'https://picsum.photos/160/90?image=8'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=9',
    thumb: 'https://picsum.photos/160/90?image=9'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=10',
    thumb: 'https://picsum.photos/160/90?image=10'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=11',
    thumb: 'https://picsum.photos/160/90?image=11'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=12',
    thumb: 'https://picsum.photos/160/90?image=12'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=13',
    thumb: 'https://picsum.photos/160/90?image=13'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=14',
    thumb: 'https://picsum.photos/160/90?image=14'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=15',
    thumb: 'https://picsum.photos/160/90?image=15'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=16',
    thumb: 'https://picsum.photos/160/90?image=16'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=17',
    thumb: 'https://picsum.photos/160/90?image=17'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=18',
    thumb: 'https://picsum.photos/160/90?image=18'
  },
  {
    type: 'image',
    orig: 'https://picsum.photos/1600/900?image=19',
    thumb: 'https://picsum.photos/160/90?image=19'
  }
]

const element = query('#vertical .gallery')
Gallery.of(element, {
  vertical: true,
  data
})
