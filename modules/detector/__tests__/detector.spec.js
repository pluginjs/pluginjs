import * as detector from '../src/main'

// function setUA(ua) {
//   window.navigator.userAgent = ua
// }

describe('Detector', () => {
  test('should have Detector', () => {
    expect(detector).toBeObject()
  })

  // describe('Android devices', () => {
  //   test('isAndroid()', () => {
  //     setUA('')
  //     expect(isAndroid()).toBeTrue()
  //   })

  //   test('isAndroidPhone()', () => {
  //     setUA('')
  //     expect(isAndroidPhone()).toBeTrue()
  //   })

  //   test('isAndroidTablet()', () => {
  //     setUA('')
  //     expect(isAndroidTablet()).toBeTrue()
  //   })
  // })
})
