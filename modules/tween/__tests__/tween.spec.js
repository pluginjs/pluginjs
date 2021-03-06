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
      }).on('complete', value => {
        expect(value).toBe(2)

        done()
      })
    })

    test('array', done => {
      expect.assertions(1)

      new Tween({
        from: [1, 2],
        to: [3, 4],
        duration: 1000
      }).on('complete', value => {
        expect(value).toEqual([3, 4])

        done()
      })
    })

    test('object', done => {
      expect.assertions(1)

      new Tween({
        from: { a: 2 },
        to: { a: 10 },
        duration: 1000
      }).on('complete', value => {
        expect(value.a).toBe(10)
        done()
      })
    })
  })

  describe('props', () => {
    test('autoplay=true', done => {
      const tween = new Tween({
        from: 0,
        to: 10,
        duration: 1000,
        autoplay: true
      })
      expect(tween.isStarted()).toBe(true)

      tween.stop()
      done()
    })
    test('autoplay=false', done => {
      const tween = new Tween({
        from: 0,
        to: 10,
        duration: 1000,
        autoplay: false
      })
      expect(tween.isStarted()).toBe(false)
      tween.stop()

      done()
    })

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
        })

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

  describe('loop', () => {
    test('loop=false', done => {
      const tween = new Tween({
        from: 0,
        to: 10,
        duration: 1000,
        loop: false
      })

      setTimeout(() => {
        expect(tween.value).toBe(10)
        expect(tween.isCompleted()).toBeTrue()
        done()
      }, 1100)
    })

    test('loop=0', done => {
      const tween = new Tween({
        from: 0,
        to: 10,
        duration: 1000,
        loop: 0
      })

      setTimeout(() => {
        expect(tween.value).toBe(10)
        expect(tween.isCompleted()).toBeTrue()
        done()
      }, 1100)
    })

    test('loop=1', done => {
      const tween = new Tween({
        from: 0,
        to: 10,
        duration: 1000,
        loop: 1
      })

      setTimeout(() => {
        expect(tween.value).toBe(10)
        expect(tween.isCompleted()).toBeTrue()
        done()
      }, 1100)
    })

    test(
      'loop=2',
      done => {
        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          loop: 2
        })

        setTimeout(() => {
          expect(tween.value).toBeGreaterThanOrEqual(8)
        }, 900)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(2)
          expect(tween.isCompleted()).toBeFalse()
        }, 1100)

        setTimeout(() => {
          expect(tween.value).toBe(10)
          expect(tween.isCompleted()).toBeTrue()
          done()
        }, 2100)
      },
      2300
    )

    test(
      'loop=3',
      done => {
        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          loop: 3
        })

        setTimeout(() => {
          expect(tween.value).toBeGreaterThanOrEqual(8)
        }, 900)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(2)
          expect(tween.isCompleted()).toBeFalse()
        }, 1100)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(2)
          expect(tween.isCompleted()).toBeFalse()
        }, 2100)

        setTimeout(() => {
          expect(tween.value).toBe(10)
          expect(tween.isCompleted()).toBeTrue()
          done()
        }, 3300)
      },
      3500
    )

    test(
      'loop=true',
      done => {
        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          loop: true
        })

        setTimeout(() => {
          expect(tween.value).toBeGreaterThanOrEqual(8)
        }, 900)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(3)
          expect(tween.isCompleted()).toBeFalse()
        }, 1200)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(3)
          expect(tween.isCompleted()).toBeFalse()
        }, 2200)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(3)
          expect(tween.isCompleted()).toBeFalse()
          tween.stop()
          done()
        }, 3200)
      },
      3500
    )

    test(
      'loop=2 and delay',
      done => {
        expect.assertions(7)
        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          delay: 1000,
          loop: 2
        })

        setTimeout(() => {
          expect(tween.value).toBe(0)
          expect(tween.isStarted()).toBeTrue()
        }, 800)

        setTimeout(() => {
          expect(tween.value).toBeGreaterThanOrEqual(8)
        }, 1900)

        setTimeout(() => {
          expect(tween.isCompleted()).toBeFalse()
          expect(tween.value).toBeLessThanOrEqual(2)
        }, 2200)

        setTimeout(() => {
          expect(tween.value).toBe(10)
          expect(tween.isCompleted()).toBeTrue()
          done()
        }, 4100)
      },
      4500
    )
  })

  describe('direction', () => {
    test(
      'normal',
      done => {
        expect.assertions(2)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          direction: 'normal'
        })

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(2)
        }, 150)

        setTimeout(() => {
          expect(tween.value).toBe(10)

          done()
        }, 1100)
      },
      1300
    )

    test(
      'reverse',
      done => {
        expect.assertions(2)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          direction: 'reverse'
        })

        setTimeout(() => {
          expect(tween.value).toBeGreaterThanOrEqual(8)
        }, 150)

        setTimeout(() => {
          expect(tween.value).toBe(0)

          done()
        }, 1100)
      },
      1300
    )

    test(
      'alternate',
      done => {
        expect.assertions(5)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          direction: 'alternate'
        })

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(2)
        }, 150)

        setTimeout(() => {
          expect(tween.value).toBeGreaterThanOrEqual(8)
        }, 900)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(8)
          expect(tween.value).toBeGreaterThanOrEqual(6)
        }, 1300)

        setTimeout(() => {
          expect(tween.value).toBe(0)
          done()
        }, 2100)
      },
      2400
    )

    test(
      'alternate with loop',
      done => {
        expect.assertions(9)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          direction: 'alternate',
          loop: 2
        })

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(2)
        }, 150)

        setTimeout(() => {
          expect(tween.value).toBeGreaterThanOrEqual(8)
        }, 900)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(8)
          expect(tween.value).toBeGreaterThanOrEqual(6)
        }, 1300)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(2)
        }, 2150)

        setTimeout(() => {
          expect(tween.value).toBeGreaterThanOrEqual(8)
        }, 2900)

        setTimeout(() => {
          expect(tween.value).toBeLessThanOrEqual(8)
          expect(tween.value).toBeGreaterThanOrEqual(6)
        }, 3300)

        setTimeout(() => {
          expect(tween.value).toBe(0)
          done()
        }, 4200)
      },
      4400
    )
  })

  describe('events', () => {
    test(
      'complete event',
      done => {
        expect.assertions(3)

        new Tween({
          from: 0,
          to: 10,
          duration: 1000
        }).on('complete', (value, api) => {
          expect(value).toBe(10)

          expect(api.elapsed).toBeGreaterThanOrEqual(1000)
          expect(api.isCompleted()).toBeTrue()
          done()
        })
      },
      1500
    )
  })

  describe('api', () => {
    test(
      'start()',
      done => {
        expect.assertions(4)

        const tween = new Tween({
          from: 0,
          to: 10,
          duration: 1000,
          autoplay: false
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

    test(
      'pause()',
      done => {
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

        setTimeout(() => tween.pause(), 300)
        setTimeout(() => {
          expect(tween.isCompleted()).toBeFalse()

          done()
        }, 1200)
      },
      2000
    )

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
          delay: 0,
          autoplay: false
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
        })

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
        }).on('restart', (value, api) => {
          expect(value).toBe(0)
          expect(api.isStarted()).toBeTrue()
        })

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

    describe('reverse()', () => {
      test(
        'at start',
        done => {
          expect.assertions(2)

          const tween = new Tween({
            from: 0,
            to: 10,
            duration: 1000
          })

          setTimeout(() => {
            tween.reverse()
          }, 200)

          setTimeout(() => {
            expect(tween.value).toBeLessThanOrEqual(2)
          }, 300)

          setTimeout(() => {
            expect(tween.value).toBe(0)

            done()
          }, 500)
        },
        1000
      )

      test(
        'at middle',
        done => {
          expect.assertions(2)

          const tween = new Tween({
            from: 0,
            to: 10,
            duration: 1000
          })

          setTimeout(() => {
            tween.reverse()
          }, 500)

          setTimeout(() => {
            expect(tween.value).toBeLessThanOrEqual(5)
          }, 600)

          setTimeout(() => {
            expect(tween.value).toBe(0)

            done()
          }, 1100)
        },
        1300
      )

      test(
        'at end',
        done => {
          expect.assertions(6)

          const tween = new Tween({
            from: 0,
            to: 10,
            duration: 1000
          })

          setTimeout(() => {
            tween.reverse()
          }, 800)

          setTimeout(() => {
            expect(tween.value).toBeLessThanOrEqual(8)
          }, 850)

          setTimeout(() => {
            expect(tween.value).toBeGreaterThanOrEqual(5)
            expect(tween.value).toBeLessThanOrEqual(7)
          }, 1000)

          setTimeout(() => {
            expect(tween.value).toBeGreaterThanOrEqual(4)
            expect(tween.value).toBeLessThanOrEqual(6)
          }, 1100)

          setTimeout(() => {
            expect(tween.value).toBe(0)

            done()
          }, 1700)
        },
        2000
      )

      test(
        'reverse again',
        done => {
          expect.assertions(3)

          const tween = new Tween({
            from: 0,
            to: 10,
            duration: 1000
          })

          setTimeout(() => {
            tween.reverse()
          }, 200)

          setTimeout(() => {
            expect(tween.value).toBeLessThanOrEqual(2) // 1

            tween.reverse()
          }, 300)

          setTimeout(() => {
            expect(tween.value).toBeGreaterThanOrEqual(2) // 3
          }, 500)

          setTimeout(() => {
            expect(tween.value).toBe(10)

            done()
          }, 1300)
        },
        1500
      )
    })
  })
})
