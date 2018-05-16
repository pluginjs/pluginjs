/* Credit to http://github.com/gre/bezier-easing MIT */
const bezier = (function() {
  const NEWTON_ITERATIONS = 6
  const NEWTON_MIN_SLOPE = 0.001
  const SUBDIVISION_PRECISION = 0.0000001
  const SUBDIVISION_MAX_ITERATIONS = 12

  const kSplineTableSize = 11
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0)

  const float32ArraySupported = typeof Float32Array === 'function'

  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1
  }
  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1
  }
  function C(aA1) {
    return 3.0 * aA1
  }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1)
  }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    let currentX
    let currentT
    let i = 0
    do {
      currentT = aA + (aB - aA) / 2.0
      currentX = calcBezier(currentT, mX1, mX2) - aX
      if (currentX > 0.0) {
        aB = currentT
      } else {
        aA = currentT
      }
    } while (
      Math.abs(currentX) > SUBDIVISION_PRECISION &&
      ++i < SUBDIVISION_MAX_ITERATIONS
    )
    return currentT
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
      const currentSlope = getSlope(aGuessT, mX1, mX2)
      if (currentSlope === 0.0) {
        return aGuessT
      }
      const currentX = calcBezier(aGuessT, mX1, mX2) - aX
      aGuessT -= currentX / currentSlope
    }
    return aGuessT
  }

  return function bezier(mX1, mY1, mX2, mY2, css) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range')
    }

    // Precompute samples table
    const sampleValues = float32ArraySupported
      ? new Float32Array(kSplineTableSize)
      : new Array(kSplineTableSize)
    if (mX1 !== mY1 || mX2 !== mY2) {
      for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2)
      }
    }

    function getTForX(aX) {
      let intervalStart = 0.0
      let currentSample = 1
      const lastSample = kSplineTableSize - 1

      for (
        ;
        currentSample !== lastSample && sampleValues[currentSample] <= aX;
        ++currentSample
      ) {
        intervalStart += kSampleStepSize
      }
      --currentSample

      // Interpolate to provide an initial guess for t
      const dist =
        (aX - sampleValues[currentSample]) /
        (sampleValues[currentSample + 1] - sampleValues[currentSample])
      const guessForT = intervalStart + dist * kSampleStepSize

      const initialSlope = getSlope(guessForT, mX1, mX2)
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2)
      } else if (initialSlope === 0.0) {
        return guessForT
      }
      return binarySubdivide(
        aX,
        intervalStart,
        intervalStart + kSampleStepSize,
        mX1,
        mX2
      )
    }

    function BezierEasing(x) {
      // linear
      if (mX1 === mY1 && mX2 === mY2) {
        return x
      }
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (x === 0) {
        return 0
      }
      if (x === 1) {
        return 1
      }
      return calcBezier(getTForX(x), mY1, mY2)
    }

    BezierEasing.css = function() {
      if (css) {
        return css
      }
      if (mX1 === mY1 && mX2 === mY2) {
        return 'linear'
      }
      return `cubic-bezier(${mX1}, ${mY1}, ${mX2}, ${mY2})`
    }

    return BezierEasing
  }
})()

/* Credit to http://easings.net/ */
const easings = {
  ease: [0.25, 0.1, 0.25, 1.0, 'ease'],
  linear: [0.0, 0.0, 1.0, 1.0, 'linear'],
  easeIn: [0.42, 0.0, 1.0, 1.0, 'ease-in'],
  easeOut: [0.0, 0.0, 0.58, 1.0, 'ease-out'],
  easeInOut: [0.42, 0.0, 0.58, 1.0, 'ease-in-out'],
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
}

export default {
  get(name) {
    if (name in easings) {
      return bezier(...easings[name])
    }
    return undefined
  },
  bezier(mX1, mY1, mX2, mY2) {
    return bezier(mX1, mY1, mX2, mY2)
  },
  register(name, mX1, mY1, mX2, mY2) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range')
    }
    easings[name] = [mX1, mY1, mX2, mY2]
  }
}
