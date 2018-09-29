import { search, rankings } from '../src/main'

describe('search()', () => {
  describe('diacritics', () => {
    it('should strip diacritics when diacritics set to false', () => {
      expect(
        search('àbc', 'àbc', {
          diacritics: false
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        search('abc', 'àbc', {
          diacritics: false
        })
      ).toBe(rankings.IGNORE_DIACRITICS_EQUAL)

      expect(
        search('a-bc', 'àbc', {
          diacritics: false,
          punctuation: false
        })
      ).toBe(rankings.IGNORE_PUNCTUATION_EQUAL)

      expect(
        search('abc', ' àbc ', {
          diacritics: false,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        search('ABC', 'àbc', {
          diacritics: false,
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        search('abc', 'àbc čde', {
          diacritics: false
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('cde', 'àbc čde', {
          diacritics: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cde', 'àbc čde efg', {
          diacritics: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cd', 'àbc čde', {
          diacritics: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('b', 'àbc čde', {
          diacritics: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should keep diacritics when diacritics set to true', () => {
      expect(
        search('àbc', 'àbc', {
          diacritics: true
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        search('à-bc', 'àbc', {
          diacritics: true,
          punctuation: false
        })
      ).toBe(rankings.IGNORE_PUNCTUATION_EQUAL)

      expect(
        search('àbc', ' àbc ', {
          diacritics: true,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        search('àBC', 'àbc', {
          diacritics: true,
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        search('àb', 'àbc čde', {
          diacritics: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('čde', 'àbc čde', {
          diacritics: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('čde', 'àbc čde efg', {
          diacritics: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('čd', 'àbc čde', {
          diacritics: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('ƌ', 'àbc čƌe', {
          diacritics: true
        })
      ).toBe(rankings.CONTAINS)

      expect(
        search('abc', 'àbc', {
          diacritics: true
        })
      ).toBe(rankings.NO_MATCH)
    })
  })

  describe('punctuation', () => {
    it('should strip punctuation when punctuation set to false', () => {
      expect(
        search('abc', 'abc', {
          punctuation: false
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        search('abc', 'a-b-c', {
          punctuation: false
        })
      ).toBe(rankings.IGNORE_PUNCTUATION_EQUAL)

      expect(
        search('abc', ' a-b-c ', {
          punctuation: false,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        search('ABC', 'a-b-c', {
          punctuation: false,
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        search('abc', 'a-b-c cde', {
          punctuation: false
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('cde', 'abc c-d-e', {
          punctuation: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cde', 'abc c-d-e efg', {
          punctuation: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cd', 'abc c-d-e', {
          punctuation: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('bc', 'ab-c cde', {
          punctuation: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should keep punctuation when punctuation set to true', () => {
      expect(
        search('abc', 'a-b-c', {
          punctuation: true
        })
      ).toBe(rankings.NO_MATCH)

      expect(
        search('a-b-c', 'a-b-c', {
          punctuation: true
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        search('a-b-c', ' a-b-c ', {
          punctuation: true,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        search('A-B-C', 'a-b-c', {
          punctuation: true,
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        search('a-b-c', 'a-b-c cde', {
          punctuation: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('c-d-e', 'abc c-d-e', {
          punctuation: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('c-d-e', 'abc c-d-e efg', {
          punctuation: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('c-d', 'abc c-d-e', {
          punctuation: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('b-c', 'ab-c cde', {
          punctuation: true
        })
      ).toBe(rankings.CONTAINS)
    })
  })

  describe('case', () => {
    it('should ignore case when case set to false', () => {
      expect(
        search('abc', 'abc', {
          case: false
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        search('ABC', ' abc ', {
          case: false,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        search('ABC', 'abc', {
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        search('ABC', 'abc cde', {
          case: false
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('CDE', 'abc cde', {
          case: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('CDE', 'abc cde efg', {
          case: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('CD', 'abc cde', {
          case: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('BC', 'abc cde', {
          case: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should match case when case set to true', () => {
      expect(
        search('abc', 'abc', {
          case: true
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        search('ABC', 'abc', {
          case: true
        })
      ).toBe(rankings.NO_MATCH)

      expect(
        search('abc', ' abc ', {
          case: true,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        search('abc', 'abc cde', {
          case: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('cde', 'abc cde', {
          case: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cde', 'abc cde efg', {
          case: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cd', 'abc cde', {
          case: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('bc', 'abc cde', {
          case: true
        })
      ).toBe(rankings.CONTAINS)
    })
  })

  describe('whitespaces', () => {
    it('should ignore whitespaces when whitespaces set to false', () => {
      expect(
        search('abc', 'abc', {
          whitespaces: false
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        search('abc', ' abc ', {
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        search('abc', '  abc', {
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        search('abc', 'abc  ', {
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        search('abc', '  abc cde  ', {
          whitespaces: false
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('cde', '  abc cde  ', {
          whitespaces: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cde', '  abc cde efg  ', {
          whitespaces: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cd', '  abc cde  ', {
          whitespaces: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('bc', '  abc cde  ', {
          whitespaces: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should match whitespaces when whitespaces set to true', () => {
      expect(
        search('abc', 'abc', {
          whitespaces: true
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        search('abc', ' abc ', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('abc', ' abc', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('abc', 'abc ', {
          whitespaces: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('abc', 'abc cde', {
          whitespaces: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        search('cde', 'abc cde', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cde', 'abc cde efg', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cd', 'abc cde', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('bc', 'abc cde', {
          whitespaces: true
        })
      ).toBe(rankings.CONTAINS)
    })
  })

  describe('boundaries', () => {
    it('should ignore boundaries when boundaries set to false', () => {
      expect(
        search('cde', 'abc cde', {
          boundaries: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cde', 'abc cde efg', {
          boundaries: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cd', 'abc cde', {
          boundaries: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('bc', 'abc cde', {
          boundaries: false
        })
      ).toBe(rankings.CONTAINS)

      expect(
        search('de', 'abc cde', {
          boundaries: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should stict to boundaries when boundaries set to true', () => {
      expect(
        search('cde', 'abc cde', {
          boundaries: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cde', 'abc cde efg', {
          boundaries: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        search('cd', 'abc cde', {
          boundaries: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        search('bc', 'abc cde', {
          boundaries: true
        })
      ).toBe(rankings.NO_MATCH)

      expect(
        search('de', 'abc cde', {
          boundaries: true
        })
      ).toBe(rankings.NO_MATCH)
    })
  })
})
