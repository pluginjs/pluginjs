import { getMatchRanking, rankings } from '../src/main'

describe('getMatchRanking()', () => {
  describe('diacritics', () => {
    it('should strip diacritics when diacritics set to false', () => {
      expect(
        getMatchRanking('àbc', 'àbc', {
          diacritics: false
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        getMatchRanking('abc', 'àbc', {
          diacritics: false
        })
      ).toBe(rankings.IGNORE_DIACRITICS_EQUAL)

      expect(
        getMatchRanking('a-bc', 'àbc', {
          diacritics: false,
          punctuation: false
        })
      ).toBe(rankings.IGNORE_PUNCTUATION_EQUAL)

      expect(
        getMatchRanking('abc', ' àbc ', {
          diacritics: false,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        getMatchRanking('ABC', 'àbc', {
          diacritics: false,
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        getMatchRanking('abc', 'àbc čde', {
          diacritics: false
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('cde', 'àbc čde', {
          diacritics: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cde', 'àbc čde efg', {
          diacritics: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cd', 'àbc čde', {
          diacritics: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('b', 'àbc čde', {
          diacritics: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should keep diacritics when diacritics set to true', () => {
      expect(
        getMatchRanking('àbc', 'àbc', {
          diacritics: true
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        getMatchRanking('à-bc', 'àbc', {
          diacritics: true,
          punctuation: false
        })
      ).toBe(rankings.IGNORE_PUNCTUATION_EQUAL)

      expect(
        getMatchRanking('àbc', ' àbc ', {
          diacritics: true,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        getMatchRanking('àBC', 'àbc', {
          diacritics: true,
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        getMatchRanking('àb', 'àbc čde', {
          diacritics: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('čde', 'àbc čde', {
          diacritics: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('čde', 'àbc čde efg', {
          diacritics: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('čd', 'àbc čde', {
          diacritics: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('ƌ', 'àbc čƌe', {
          diacritics: true
        })
      ).toBe(rankings.CONTAINS)

      expect(
        getMatchRanking('abc', 'àbc', {
          diacritics: true
        })
      ).toBe(rankings.NO_MATCH)
    })
  })

  describe('punctuation', () => {
    it('should strip punctuation when punctuation set to false', () => {
      expect(
        getMatchRanking('abc', 'abc', {
          punctuation: false
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        getMatchRanking('abc', 'a-b-c', {
          punctuation: false
        })
      ).toBe(rankings.IGNORE_PUNCTUATION_EQUAL)

      expect(
        getMatchRanking('abc', ' a-b-c ', {
          punctuation: false,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        getMatchRanking('ABC', 'a-b-c', {
          punctuation: false,
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        getMatchRanking('abc', 'a-b-c cde', {
          punctuation: false
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('cde', 'abc c-d-e', {
          punctuation: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cde', 'abc c-d-e efg', {
          punctuation: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cd', 'abc c-d-e', {
          punctuation: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('bc', 'ab-c cde', {
          punctuation: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should keep punctuation when punctuation set to true', () => {
      expect(
        getMatchRanking('abc', 'a-b-c', {
          punctuation: true
        })
      ).toBe(rankings.NO_MATCH)

      expect(
        getMatchRanking('a-b-c', 'a-b-c', {
          punctuation: true
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        getMatchRanking('a-b-c', ' a-b-c ', {
          punctuation: true,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        getMatchRanking('A-B-C', 'a-b-c', {
          punctuation: true,
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        getMatchRanking('a-b-c', 'a-b-c cde', {
          punctuation: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('c-d-e', 'abc c-d-e', {
          punctuation: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('c-d-e', 'abc c-d-e efg', {
          punctuation: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('c-d', 'abc c-d-e', {
          punctuation: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('b-c', 'ab-c cde', {
          punctuation: true
        })
      ).toBe(rankings.CONTAINS)
    })
  })

  describe('case', () => {
    it('should ignore case when case set to false', () => {
      expect(
        getMatchRanking('abc', 'abc', {
          case: false
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        getMatchRanking('ABC', ' abc ', {
          case: false,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        getMatchRanking('ABC', 'abc', {
          case: false
        })
      ).toBe(rankings.IGNORE_CASE_EQUAL)

      expect(
        getMatchRanking('ABC', 'abc cde', {
          case: false
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('CDE', 'abc cde', {
          case: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('CDE', 'abc cde efg', {
          case: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('CD', 'abc cde', {
          case: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('BC', 'abc cde', {
          case: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should match case when case set to true', () => {
      expect(
        getMatchRanking('abc', 'abc', {
          case: true
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        getMatchRanking('ABC', 'abc', {
          case: true
        })
      ).toBe(rankings.NO_MATCH)

      expect(
        getMatchRanking('abc', ' abc ', {
          case: true,
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        getMatchRanking('abc', 'abc cde', {
          case: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('cde', 'abc cde', {
          case: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cde', 'abc cde efg', {
          case: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cd', 'abc cde', {
          case: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('bc', 'abc cde', {
          case: true
        })
      ).toBe(rankings.CONTAINS)
    })
  })

  describe('whitespaces', () => {
    it('should ignore whitespaces when whitespaces set to false', () => {
      expect(
        getMatchRanking('abc', 'abc', {
          whitespaces: false
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        getMatchRanking('abc', ' abc ', {
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        getMatchRanking('abc', '  abc', {
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        getMatchRanking('abc', 'abc  ', {
          whitespaces: false
        })
      ).toBe(rankings.IGNORE_WHITESPACES_EQUAL)

      expect(
        getMatchRanking('abc', '  abc cde  ', {
          whitespaces: false
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('cde', '  abc cde  ', {
          whitespaces: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cde', '  abc cde efg  ', {
          whitespaces: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cd', '  abc cde  ', {
          whitespaces: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('bc', '  abc cde  ', {
          whitespaces: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should match whitespaces when whitespaces set to true', () => {
      expect(
        getMatchRanking('abc', 'abc', {
          whitespaces: true
        })
      ).toBe(rankings.STRICTEQUAL)

      expect(
        getMatchRanking('abc', ' abc ', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('abc', ' abc', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('abc', 'abc ', {
          whitespaces: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('abc', 'abc cde', {
          whitespaces: true
        })
      ).toBe(rankings.STARTS_WITH)

      expect(
        getMatchRanking('cde', 'abc cde', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cde', 'abc cde efg', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cd', 'abc cde', {
          whitespaces: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('bc', 'abc cde', {
          whitespaces: true
        })
      ).toBe(rankings.CONTAINS)
    })
  })

  describe('boundaries', () => {
    it('should ignore boundaries when boundaries set to false', () => {
      expect(
        getMatchRanking('cde', 'abc cde', {
          boundaries: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cde', 'abc cde efg', {
          boundaries: false
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cd', 'abc cde', {
          boundaries: false
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('bc', 'abc cde', {
          boundaries: false
        })
      ).toBe(rankings.CONTAINS)

      expect(
        getMatchRanking('de', 'abc cde', {
          boundaries: false
        })
      ).toBe(rankings.CONTAINS)
    })

    it('should stict to boundaries when boundaries set to true', () => {
      expect(
        getMatchRanking('cde', 'abc cde', {
          boundaries: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cde', 'abc cde efg', {
          boundaries: true
        })
      ).toBe(rankings.WORD_MATCH)

      expect(
        getMatchRanking('cd', 'abc cde', {
          boundaries: true
        })
      ).toBe(rankings.WORD_STARTS_WITH)

      expect(
        getMatchRanking('bc', 'abc cde', {
          boundaries: true
        })
      ).toBe(rankings.NO_MATCH)

      expect(
        getMatchRanking('de', 'abc cde', {
          boundaries: true
        })
      ).toBe(rankings.NO_MATCH)
    })
  })
})
