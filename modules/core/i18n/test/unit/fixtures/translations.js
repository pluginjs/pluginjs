const translations = {}

translations.en = {
  hello: 'Hello World!',

  greetings: {
    stranger: 'Hello stranger!',
    name: 'Hello {name}!'
  },

  profile: { details: '{name} is {age}-years old' },

  inbox: [
    'You have {count} message',
    'You have {count} messages',
    'You have no messages'
  ],

  sent: [null, null, null]
}

translations['pt-BR'] = { hello: 'Olá Mundo!' }

translations.de = { hello: 'Hallo Welt!' }

translations.nb = { hello: 'Hei Verden!' }

export default translations
