import Tween from '../src/main'
import Easing from '@pluginjs/easing'

global.requestAnimationFrame = func => {
  setTimeout(func, 10)
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

  test('easing', done => {
    expect.hasAssertions()
    const easingFunc = Easing.get('ease')

    new Tween({
      from: 0,
      to: 10,
      duration: 1000,
      easing: easingFunc
    })
      .on('update', (value, { elapsed }) => {
        expect(value).toBeCloseTo(easingFunc(elapsed / 1000) * 10, 2)
      })
      .on('complete', value => {
        expect(value).toBe(10)
        done()
      })
      .start()
  })

  test('complete', done => {
    expect.assertions(3)

    new Tween({
      from: 1,
      to: 10
    })
      .once('update', value => {
        expect(value).toBeDefined()
      })
      .on('complete', (value, { elapsed }) => {
        expect(value).toBe(10)

        expect(elapsed).toBeGreaterThanOrEqual(1000)

        done()
      })
      .start()
  })

  test('start', done => {
    expect.assertions(2)

    const tween = new Tween({
      from: 1,
      to: 10,
      duration: 1000
    })
      .on('start', (value, api) => {
        expect(api.isStarted()).toBeTrue()
      })
      .on('complete', () => {
        done()
      })

    expect(tween.isStarted()).toBeFalse()

    tween.start()
  })

  test('pause', done => {
    expect.assertions(3)

    // let called = false
    const tween = new Tween({
      from: 1,
      to: 10,
      duration: 1000
    })
      .on('start', (value, api) => {
        expect(api.isPaused()).toBeFalse()
      })
      .on('pause', (value, api) => {
        expect(value).toBeLessThanOrEqual(5)
        expect(api.isPaused()).toBeTrue()
      })
      .on('complete', () => {
        // called = true
      })
      .start()

    setTimeout(() => tween.pause(), 200)
    setTimeout(() => {
      // expect(called).toBeFalse()
      done()
    }, 1200)
  })
})
