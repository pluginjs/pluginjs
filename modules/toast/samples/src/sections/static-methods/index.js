import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const reset = query('#static-methods .example-reset')
const warning = query('#static-methods .example-warning')
const success = query('#static-methods .example-success')
const error = query('#static-methods .example-error')

reset.addEventListener('click', () => {
  Toast.reset()
})

warning.addEventListener('click', () => {
  Toast.warning(
    'My name is Inigo Montoya. You killed my father, prepare to die!'
  )
})

success.addEventListener('click', () => {
  Toast.success('Miracle Max Says', 'Have fun storming the castle!')
})

error.addEventListener('click', () => {
  Toast.error(
    'Inconceivable!',
    'I do not think that word means what you think it means.'
  )
})
