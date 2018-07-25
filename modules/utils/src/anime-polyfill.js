function fromPairs(arr) {
  return arr.reduce(
    (r, [k, v]) => ({
      ...r,
      [k]: v
    }),
    {}
  )
}

function mergeWith(...args) {
  const objs = args.slice(0, -1)
  const customizer = args[args.length - 1]
  return Object.entries(args[0]).reduce(
    (r, [k]) => ({
      ...r,
      [k]: objs
        .map(obj => obj[k])
        .filter(v => Boolean(v) || v === 0)
        .reduce((r, i) => customizer(r, i))
    }),
    {}
  )
}

const T = {
  0: 'X',
  1: 'Y',
  2: 'Z'
}

function mapTransformToAnime(str) {
  const css3dList = ['translate', 'rotate', 'scale']
  return css3dList
    .filter(key => {
      const regx = new RegExp(key, 'g')
      if (str.match(regx)) {
        return true
      }
      return false
    })
    .reduce((initialState, key) => {
      const matrix = str.match(/\(([^()]+)\)/)[1].split(',')
      const map = mapMatch(key)
      return map(matrix)
    }, {})
}

function mapMatch(type) {
  switch (type) {
    case 'translate':
      return mapToTranslate
    case 'rotate':
      return mapToRotate
    case 'scale':
      return mapToScale
    default:
      return () => 'no match!'
  }
}

function mapToScale(matrix) {
  const result = matrix.map((value, index) => {
    const n = parseFloat(value, 10)
    const result = { [`scale${T[index]}`]: n || 0 }
    return result
  })
  return result.reduce(mergeObject)
}

function mapToTranslate(matrix) {
  const result = matrix.map((value, index) => {
    const n = parseFloat(value.slice(0, -2), 10)
    const result = { [`translate${T[index]}`]: n || 0 }
    return result
  })
  return result.reduce(mergeObject)
}

function mapToRotate(matrix) {
  const value = matrix[matrix.length - 1].slice(0, -3)
  const transformType = matrix
    .slice(0, -1)
    .map((n, index) => {
      if (parseInt(n, 10)) {
        return `rotate${T[index]}`
      }
      return n
    })
    .filter(isNotEmpty)
  return { [transformType[0]]: parseFloat(value) }
}

function mergeObject(r, i) {
  return {
    ...r,
    ...i
  }
}

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
  return [objValue, srcValue]
}

function isNotEmpty(value) {
  if (value) {
    return true
  }
  return false
}

function filterOffset(obj) {
  const { offset, ...result } = obj
  return result
}

function filterEmptyValues(obj) {
  return fromPairs(
    Object.entries(obj)
      .filter(([, v]) => {
        const arr = v.filter(i => Boolean(i))
        if (arr.length) {
          return true
        }
        return false
      })
      .map(([k, v]) => {
        const value = v.map(i => {
          if (typeof i === 'undefined') {
            if (/scale/g.test(k)) {
              return 1
            }
            return 0
          }
          return i
        })
        return [k, value]
      })
  )
}

export default function mapKeyFramesToAnime(keyframes) {
  const transformNoneIndex = []
  const transformKeys = new Set()
  const newKeyFrames = keyframes.map((keyframe, keyframeIndex) => {
    const { transform, ...newKeyFrame } = keyframe
    if (transform) {
      const arr = transform
        .split(') ')
        .map((item, index, arr) => {
          if (index !== arr.length - 1) {
            return `${item})`
          }
          return item
        })
        .map(value => {
          if (/3d/g.test(value)) {
            const transformObject = mapTransformToAnime(value)
            Object.keys(transformObject).map(key => transformKeys.add(key))
            return transformObject
          }
          return value
        })
        .filter(value => typeof value !== 'string')
      if (!arr.length) {
        transformNoneIndex.push(keyframeIndex)
        return newKeyFrame
      }
      return Object.assign({}, newKeyFrame, ...arr)
    }
    return newKeyFrame
  })
  const emptyTransform = fromPairs(
    Array.from(transformKeys).map(key => {
      if (/scale/g.test(key)) {
        return [key, 1]
      }
      return [key, 0]
    })
  )
  if (transformNoneIndex.length) {
    for (const index of transformNoneIndex) {
      Object.assign(newKeyFrames[index], emptyTransform)
    }
  }
  const data = mergeWith(...newKeyFrames, customizer)
  const result = filterOffset(filterEmptyValues(data))
  return result
}
