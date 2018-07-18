import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const reset = query('#static-function .funcreset')
const warning = query('#static-function .funcwarning')
const success = query('#static-function .funcsuccess')
const error = query('#static-function .funcerror')
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
