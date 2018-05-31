export default class animate {
  static fade = {
    start: {
      opacity: 0,
      '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)'
    },
    finish: {
      transition: 'opacity .3s',
      '-webkit-transition': 'opacity .3s',
      opacity: 1,
      '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'
    }
  }
}
