import Tween from '../src/main'
import Easing from '@pluginjs/easing'

global.requestAnimationFrame = func => {
  setTimeout(func, 100)
}

describe('Tween()', () => {
  describe('Types', () => {
    test('number', done => {
      expect.assertions(1)

      new Tween({
        from: 1,
        to: 2,
        duration: 1000
      })
        .on('complete', value => {
          expect(value).toBe(2)

          done()
        })
        .start()
    })

    test('array', done => {
      expect.assertions(1)

      new Tween({
        from: [1, 2],
        to: [3, 4],
        duration: 1000
      })
        .on('complete', value => {
          expect(value).toEqual([3, 4])

          done()
        })
        .start()
    })

    test('object', done => {
      expect.assertions(1)

      new Tween({
        from: { a: 2 },
        to: { a: 10 },
        duration: 1000
      })
        .on('complete', value => {
          expect(value.a).toBe(10)
          done()
        })
        .start()
    })
  })

  describe('props', () => {
    test('easing', done => {
      expect.hasAssertions()
      const easingFunc = Easing.get('easeIn')

      new Tween({
        from: 0,
        to: 10,
        duration: 1000,
        easing: easingFunc
      })
        .on('update', (value, { elapsed }) => {
          if (elapsed < 950) {
            expect(value).toBeCloseTo(easingFunc(elapsed / 1000) * 10, 3)
          }
        })
        .on('complete', value => {
          expect(value).toBe(10)
          done()
        })
        .start()
    })

    test(
      'delay',
      done => {
        expect.assertions(4)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          delay: 1000
        }).start()

        setTimeout(() => {
          expect(tween.value).toBe(0)
          expect(tween.isStarted()).toBeTrue()
        }, 800)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(6)
        }, 1500)

        setTimeout(() => {
          expect(tween.value).toBe(10)
          done()
        }, 2100)
      },
      3000
    )
  })

  describe('events', () => {
    test('complete event', done => {
      expect.assertions(4)

      new Tween({
        from: 0,
        to: 10
      })
        .once('update', value => {
          expect(value).toBeDefined()
        })
        .on('complete', (value, api) => {
          expect(value).toBe(10)

          expect(api.elapsed).toBeGreaterThanOrEqual(1000)
          expect(api.isCompleted()).toBeTrue()
          done()
        })
        .start()
    })
  })

  describe('api', () => {
    test(
      'start()',
      done => {
        expect.assertions(4)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000
        })
          .on('start', (value, api) => {
            expect(api.isStarted()).toBeTrue()
            expect(api.isPlaying()).toBeTrue()
          })
          .on('complete', (value, api) => {
            expect(api.isPlaying()).toBeFalse()
            done()
          })

        expect(tween.isStarted()).toBeFalse()

        tween.start()
      },
      1200
    )

    test('pause()', done => {
      expect.assertions(5)

      const tween = new Tween({
        from: 0,
        to: 10,
        duration: 1000
      })
        .on('start', (value, api) => {
          expect(api.isPaused()).toBeFalse()
        })
        .on('pause', (value, api) => {
          expect(value).toBeLessThanOrEqual(5)
          expect(api.isPaused()).toBeTrue()
          expect(api.isPlaying()).toBeFalse()
        })
        .start()

      setTimeout(() => tween.pause(), 200)
      setTimeout(() => {
        expect(tween.isCompleted()).toBeFalse()
        done()
      }, 1200)
    })

    test(
      'resume()',
      done => {
        expect.assertions(9)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000
        })
          .on('start', (value, api) => {
            expect(api.isPaused()).toBeFalse()
          })
          .on('pause', (value, api) => {
            expect(value).toBeLessThanOrEqual(6)
            expect(api.isPaused()).toBeTrue()
            expect(api.isPlaying()).toBeFalse()
          })
          .on('resume', (value, api) => {
            expect(value).toBeLessThanOrEqual(6)
            expect(api.isPaused()).toBeFalse()
            expect(api.isPlaying()).toBeTrue()
          })
          .start()

        setTimeout(() => tween.pause(), 500)
        setTimeout(() => tween.resume(), 700)

        setTimeout(() => {
          expect(tween.isCompleted()).toBeFalse()
        }, 1100)

        setTimeout(() => {
          expect(tween.isCompleted()).toBeTrue()
          done()
        }, 1500)
      },
      3000
    )

    test(
      'seek()',
      () => {
        expect.assertions(6)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          delay: 0
        }).on('update', value => {
          expect(value).not.toBe(0)
        })

        tween.seek(500)
        expect(tween.value).toBe(5)

        tween.seek(1000)
        expect(tween.value).toBe(10)

        tween.seek(300)
        expect(tween.value).toBe(3)
      },
      1000
    )

    test(
      'stop()',
      done => {
        expect.assertions(4)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000
        })
          .on('start', (value, api) => {
            expect(api.isStarted()).toBeTrue()
          })
          .on('stop', (value, api) => {
            expect(api.isStarted()).toBeFalse()
          })
          .start()

        setTimeout(() => tween.stop(), 500)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(6)
          expect(tween.isCompleted()).toBeFalse()
          done()
        }, 1100)
      },
      3000
    )

    test(
      'start() after stop()',
      done => {
        expect.assertions(6)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000
        }).start()

        setTimeout(() => tween.stop(), 500)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(6)
          expect(tween.isCompleted()).toBeFalse()
          expect(tween.isStarted()).toBeFalse()
          tween.start()
        }, 1100)

        setTimeout(() => {
          expect(tween.value).toBe(10)
          expect(tween.isStarted()).toBeTrue()
          expect(tween.isCompleted()).toBeTrue()

          done()
        }, 1800)
      },
      3000
    )

    test(
      'restart()',
      done => {
        expect.assertions(6)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000
        })
          .on('restart', (value, api) => {
            expect(value).toBe(0)
            expect(api.isStarted()).toBeTrue()
          })
          .start()

        setTimeout(() => tween.restart(), 500)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(2)
          expect(tween.isCompleted()).toBeFalse()
        }, 600)
        setTimeout(() => {
          expect(tween.value).toBe(10)
          expect(tween.isCompleted()).toBeTrue()
          done()
        }, 1600)
      },
      3000
    )
  })
})
