import * as detector from '../src/main'

describe('Detector', () => {
  test('should have Detector', () => {
    expect(detector).toBeObject()
  })

  test('isDesktop()', () => {
    ;[
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5'
    ].forEach(ua => {
      detector.setUserAgent(ua)

      expect(detector.isDesktop()).toBeTrue()
      expect(detector.isMobile()).toBeFalse()
      expect(detector.isTablet()).toBeFalse()
    })
  })

  describe('Android devices', () => {
    test('isAndroidPhone()', () => {
      detector.setUserAgent(
        'Mozilla/5.0 (Linux; Android 4.3; Galaxy Nexus Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.99 Mobile Safari/537.36'
      )
      expect(detector.isAndroid()).toBeTrue()
      expect(detector.isAndroidPhone()).toBeTrue()

      expect(detector.isWindows()).toBeFalse()
      expect(detector.isIos()).toBeFalse()
      expect(detector.isBlackberry()).toBeFalse()

      expect(detector.isMobile()).toBeTrue()
      expect(detector.isTablet()).toBeFalse()
      expect(detector.isDesktop()).toBeFalse()
    })

    test('isAndroidTablet()', () => {
      detector.setUserAgent(
        'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 7 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.99 Safari/537.36'
      )
      expect(detector.isAndroid()).toBeTrue()
      expect(detector.isAndroidTablet()).toBeTrue()

      expect(detector.isWindows()).toBeFalse()
      expect(detector.isIos()).toBeFalse()
      expect(detector.isBlackberry()).toBeFalse()

      expect(detector.isMobile()).toBeFalse()
      expect(detector.isTablet()).toBeTrue()
      expect(detector.isDesktop()).toBeFalse()
    })
  })

  describe('Blackberry devices', () => {
    test('isBlackberryPhone()', () => {
      detector.setUserAgent(
        'Mozilla/5.0 (BB10; Kbd) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.1.0.1429 Mobile Safari/537.10+'
      )
      expect(detector.isBlackberry()).toBeTrue()
      expect(detector.isBlackberryPhone()).toBeTrue()

      expect(detector.isWindows()).toBeFalse()
      expect(detector.isIos()).toBeFalse()
      expect(detector.isAndroid()).toBeFalse()

      expect(detector.isMobile()).toBeTrue()
      expect(detector.isTablet()).toBeFalse()
      expect(detector.isDesktop()).toBeFalse()
    })

    test('isBlackberryTablet()', () => {
      detector.setUserAgent(
        'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML, like Gecko) Version/7.2.1.0 Safari/536.2+'
      )
      expect(detector.isBlackberry()).toBeTrue()
      expect(detector.isBlackberryTablet()).toBeTrue()

      expect(detector.isWindows()).toBeFalse()
      expect(detector.isIos()).toBeFalse()
      expect(detector.isAndroid()).toBeFalse()

      expect(detector.isMobile()).toBeFalse()
      expect(detector.isTablet()).toBeTrue()
      expect(detector.isDesktop()).toBeFalse()
    })
  })

  describe('Ios devices', () => {
    test('isIphone()', () => {
      detector.setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/50.0.2661.95 Mobile/13E238 Safari/601.1.46'
      )
      expect(detector.isIos()).toBeTrue()
      expect(detector.isIphone()).toBeTrue()

      expect(detector.isWindows()).toBeFalse()
      expect(detector.isBlackberry()).toBeFalse()
      expect(detector.isAndroid()).toBeFalse()

      expect(detector.isMobile()).toBeTrue()
      expect(detector.isTablet()).toBeFalse()
      expect(detector.isDesktop()).toBeFalse()
    })

    test('isIpad()', () => {
      detector.setUserAgent(
        'Mozilla/5.0 (iPad; CPU OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53'
      )
      expect(detector.isIos()).toBeTrue()
      expect(detector.isIpad()).toBeTrue()

      expect(detector.isWindows()).toBeFalse()
      expect(detector.isBlackberry()).toBeFalse()
      expect(detector.isAndroid()).toBeFalse()

      expect(detector.isMobile()).toBeFalse()
      expect(detector.isTablet()).toBeTrue()
      expect(detector.isDesktop()).toBeFalse()
    })

    test('isIpod()', () => {
      detector.setUserAgent(
        'Mozilla/5.0 (iPod touch; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B511 Safari/9537.53'
      )
      expect(detector.isIos()).toBeTrue()
      expect(detector.isIpod()).toBeTrue()

      expect(detector.isWindows()).toBeFalse()
      expect(detector.isBlackberry()).toBeFalse()
      expect(detector.isAndroid()).toBeFalse()

      expect(detector.isMobile()).toBeTrue()
      expect(detector.isTablet()).toBeFalse()
      expect(detector.isDesktop()).toBeFalse()
    })
  })

  describe('Windows devices', () => {
    test('isWindowsPhone()', () => {
      detector.setUserAgent(
        'Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft; Lumia 640 LTE) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537'
      )
      expect(detector.isWindows()).toBeTrue()
      expect(detector.isWindowsPhone()).toBeTrue()

      expect(detector.isIos()).toBeFalse()
      expect(detector.isBlackberry()).toBeFalse()
      expect(detector.isAndroid()).toBeFalse()

      expect(detector.isMobile()).toBeTrue()
      expect(detector.isTablet()).toBeFalse()
      expect(detector.isDesktop()).toBeFalse()
    })
  })
})
