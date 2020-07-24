
import { 
  arrayFillPolyfill,
  arrayOfPolyfill,
  arrayIncludesPolyfill,
  arrayFindIndexPolyfill,
  arrayFilterPolyfill,
  arrayFindPolyfill,
  arrayFromPolyfill,
  intersectionObserverPolyfill,
  objectEntriesPolyfill,
  objectValuesPolyfill,
  objectKeysPolyfill,
  objectAssignPolyfill,
  stringIncludesPolyfill
} from '@pluginjs/polyfills'

arrayOfPolyfill()
arrayFillPolyfill()
arrayIncludesPolyfill()
arrayFilterPolyfill()
arrayFindPolyfill()
arrayFromPolyfill()
arrayFindIndexPolyfill()
intersectionObserverPolyfill()
objectEntriesPolyfill()
objectValuesPolyfill()
objectKeysPolyfill()
objectAssignPolyfill()
stringIncludesPolyfill()

import register from './register'
import eventable from './eventable'
import stateable from './stateable'
import styleable from './styleable'
import themeable from './themeable'
import translateable from './translateable'
import optionable from './optionable'
import globalRegister from './globalRegister'

export {
  register,
  globalRegister,
  eventable,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
}
