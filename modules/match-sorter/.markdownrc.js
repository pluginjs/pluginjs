const body = `## API

- matchSorter
- getHighestRanking
- getMatchRanking
- getAcronym
- stringsByCharOrder
- sortRankedItems
- prepareValueForComparison
- getItemValue
- getAllValuesToRank`

export default {
  meta: {
    moduleName: 'match-sorter',
    namespace: 'matchSorter',
    Namespace: 'MatchSorter',
    desc: '`match-sorter` is a utility JavaScript library.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}