const body = `## API

- hasTranslation
- addTranslation
- getTranslation
- instance
- setTranslations`

export default {
  meta: {
    moduleName: 'i18n',
    namespace: 'i18n',
    Namespace: 'I18n',
    desc: '`i18n` is a utility JavaScript library for globalization.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}