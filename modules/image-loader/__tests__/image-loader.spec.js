import ImageLoader from '../src/main'

describe('ImageLoader', () => {
  describe('ImageLoader()', () => {
    it('should have ImageLoader', () => {
      expect(ImageLoader).toBeFunction()
    })
  })

  it(
    'should works with image string',
    done => {
      let error = false
      let loaded = false

      const img = 'https://picsum.photos/200/300'

      ImageLoader.of(img)
        .on('error', () => {
          error = true
        })
        .on('loaded', el => {
          loaded = true
          expect(el).toBe(img)
        })

      setTimeout(() => {
        expect(error).toBeFalse()
        expect(loaded).toBeTrue()

        done()
      }, 6000)
    },
    8000
  )

  describe('callbacks', () => {
    describe('loaded', () => {
      it(
        'should trigger loaded when image loaded',
        done => {
          const img = new Image()
          let error = false
          let loaded = false

          img.src = 'https://picsum.photos/200/300'

          ImageLoader.of(img)
            .on('error', () => {
              error = true
            })
            .on('loaded', el => {
              loaded = true
              expect(el).toBe(img)
            })

          setTimeout(() => {
            expect(error).toBeFalse()
            expect(loaded).toBeTrue()

            done()
          }, 6000)
        },
        8000
      )

      it(
        'should only trigger loaded once',
        done => {
          const img = new Image()
          let error = 0
          let loaded = 0

          img.src = 'https://picsum.photos/200/300'

          ImageLoader.of(img)
            .on('error', () => {
              error++
            })
            .on('loaded', () => {
              loaded++
            })

          setTimeout(() => {
            expect(error).toBe(0)
            expect(loaded).toBe(1)

            done()
          }, 6000)
        },
        8000
      )
    })

    describe('error', () => {
      it(
        'should trigger error when image load error',
        done => {
          const img = new Image()
          let error = false
          let loaded = false
          img.src = 'non-exits.jpg'

          ImageLoader.of(img)
            .on('error', el => {
              error = true
              expect(el).toBe(img)
            })
            .on('loaded', () => {
              loaded = true
            })

          setTimeout(() => {
            expect(error).toBeTrue()
            expect(loaded).toBeFalse()

            done()
          }, 4000)
        },
        5000
      )

      it(
        'should only trigger error once',
        done => {
          const img = new Image()
          let error = 0
          let loaded = 0

          img.src = 'non-exits.jpg'

          ImageLoader.of(img)
            .on('error', () => {
              error++
            })
            .on('loaded', () => {
              loaded++
            })

          setTimeout(() => {
            expect(error).toBe(1)
            expect(loaded).toBe(0)

            done()
          }, 4000)
        },
        5000
      )
    })

    describe('always', () => {
      it(
        'should trigger always when image loaded',
        done => {
          const img = new Image()
          let always
          img.src = 'https://picsum.photos/200/300'

          ImageLoader.of(img).on('always', (el, loaded) => {
            always = loaded
            expect(el).toBe(img)
          })

          setTimeout(() => {
            expect(always).toBeTrue()

            done()
          }, 4000)
        },
        5000
      )

      it(
        'should trigger always when image load error',
        done => {
          const img = new Image()
          let always
          img.src = 'non-exits.jpg'

          ImageLoader.of(img).on('always', (el, loaded) => {
            always = loaded
            expect(el).toBe(img)
          })

          setTimeout(() => {
            expect(always).toBeFalse()

            done()
          }, 4000)
        },
        5000
      )
    })
  })
})
