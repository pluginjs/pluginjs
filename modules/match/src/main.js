import normalize from './normalize'
import punctuationize from './punctuationize'
import { isFunction, isNull, isUndefined } from '@pluginjs/is'
import { getValueByPath } from '@pluginjs/utils'

/* Credit to https://github.com/kentcdodds/match-sorter MIT */
export const rankings = {
  STRICTEQUAL: 10,
  IGNORE_DIACRITICS_EQUAL: 9,
  IGNORE_PUNCTUATION_EQUAL: 8,
  IGNORE_WHITESPACES_EQUAL: 7,
  IGNORE_CASE_EQUAL: 6,
  STARTS_WITH: 5,
  WORD_MATCH: 4,
  WORD_STARTS_WITH: 3,
  CONTAINS: 2,
  WORD_INITIAL: 11,
  NO_MATCH: 0
}

export default function match(items, query, options = {}) {
  if (!query) {
    return items
  }
  options = Object.assign(
    {
      sort: true
    },
    options
  )

  const { keys } = options
  const matchedItems = items.reduce((matches, item, index) => {
    const { rank, keyIndex } = getHighestRanking(query, item, keys, options)
    const matchedSubstrings = getMatchString(query, item, rank)

    if (rank > rankings.NO_MATCH) {
      if (keyIndex === 0) {
        matches.push({ item, rank, index, keyIndex, matchedSubstrings })
      } else {
        matches.push({ item, rank, index, keyIndex })
      }
    }
    return matches
  }, [])

  if (options.sort) {
    matchedItems.sort(sortRankedItems)
  }
  return matchedItems.map(({ item }) => item)
}

export const search = getMatchRanking

/**
 * Gets the highest ranking for value for the given item based on its values for the given keys
 */
function getHighestRanking(query, item, keys, options) {
  if (!keys) {
    return {
      rank: getMatchRanking(query, item, options),
      keyIndex: -1
    }
  }
  const valuesToRank = getValuesToRank(item, keys)

  return valuesToRank.reduce(
    ({ rank, keyIndex }, { value }, i) => {
      const newRank = getMatchRanking(query, value, options, keyIndex)
      if (newRank > rank) {
        rank = newRank
        keyIndex = i
      }
      return { rank, keyIndex }
    },
    { rank: rankings.NO_MATCH, keyIndex: -1 }
  )
}

/**
 * Gives a rankings score based on how well the two strings match.
 */
function getMatchRanking(query, value, options = {}, keyIndex) {
  options = Object.assign(
    {
      diacritics: false,
      punctuation: false,
      case: false,
      whitespaces: false,
      boundaries: false
    },
    options
  )

  if (query === value) {
    return rankings.STRICTEQUAL
  }

  query = `${query}`
  value = `${value}`

  if (keyIndex === -1) {
    const valueArr = value.split(' ')
    let newValue = ''
    valueArr.forEach(item => {
      const initial = `${item.slice(0, 1)}`
      newValue += initial
    })

    if (newValue.includes(query)) {
      return rankings.WORD_INITIAL
    }
  }

  if (!options.diacritics) {
    query = normalize(query)
    value = normalize(value)

    if (query === value) {
      return rankings.IGNORE_DIACRITICS_EQUAL
    }
  }

  if (!options.punctuation) {
    query = punctuationize(query)
    value = punctuationize(value)
    if (query === value) {
      return rankings.IGNORE_PUNCTUATION_EQUAL
    }
  }

  if (!options.whitespaces) {
    query = query.trim()
    value = value.trim()

    if (query === value) {
      return rankings.IGNORE_WHITESPACES_EQUAL
    }
  }

  if (!options.case) {
    query = query.toLowerCase()
    value = value.toLowerCase()

    if (query === value) {
      return rankings.IGNORE_CASE_EQUAL
    }
  }

  if (value.indexOf(query) === 0) {
    return rankings.STARTS_WITH
  }

  if (value.indexOf(` ${query}`) !== -1) {
    if (new RegExp(`(\\s)${query}(?=\\s|$)`, 'g').test(value)) {
      return rankings.WORD_MATCH
    }
    return rankings.WORD_STARTS_WITH
  }

  if (!options.boundaries) {
    if (value.includes(query)) {
      return rankings.CONTAINS
    }
  }

  return rankings.NO_MATCH
}

function getMatchString(query, value, rank) {
  const matchArr = []
  const matchArrItem = {}

  if (rank === 11) {
    query = query.split('')
    query.forEach(item => {
      const matchArrItem = {}
      matchArrItem.offset = ''
      matchArrItem.length = 1
      matchArrItem.offset = value.name.search(item)
      matchArr.push(matchArrItem)
    })
  } else {
    query = punctuationize(normalize(query.trim().toLowerCase()))
    matchArrItem.length = query.length
    matchArrItem.offset = value.name.search(query)
    matchArr.push(matchArrItem)
  }
  return matchArr
}

/**
 * Sorts items that have a rank, index, and keyIndex
 */
function sortRankedItems(a, b) {
  const aFirst = -1
  const bFirst = 1
  const { rank: aRank, index: aIndex, keyIndex: aKeyIndex } = a
  const { rank: bRank, index: bIndex, keyIndex: bKeyIndex } = b
  const same = aRank === bRank
  if (same) {
    if (aKeyIndex === bKeyIndex) {
      return aIndex < bIndex ? aFirst : bFirst
    }
    return aKeyIndex < bKeyIndex ? aFirst : bFirst
  }
  return aRank > bRank ? aFirst : bFirst
}

/**
 * Gets all the values for the given keys in the given item and returns an array of those values
 */
function getValuesToRank(item, keys) {
  return keys.reduce((all, key) => {
    const values = getItemValues(item, key)
    if (values) {
      values.forEach(v => {
        all.push({
          value: v,
          key
        })
      })
    }

    return all
  }, [])
}

/**
 * Gets value for key in item at arbitrarily nested keypath
 */
function getItemValues(item, key) {
  let value

  if (isFunction(key)) {
    value = key(item)
  } else {
    value = getValueByPath(item, key)
  }

  return isNull(value) || isUndefined(value) ? null : [].concat(value)
}
