import { query } from '@pluginjs/dom'
import FontPicker from '@pluginjs/font-picker'
import WebFont from 'webfontloader'

const element = query('#manage .example')

FontPicker.of(element, {
  source(resolve) {
    resolve({
      name: 'google',
      title: 'Google',
      icon: 'pj-icon pj-icon-google',
      fonts: [
        'Open Sans',
        'Roboto',
        'Lato',
        'Slabo 27px',
        'Oswald',
        'Source Sans Pro',
        'Montserrat',
        'PT Sans',
        'Raleway',
        'Lora'
      ],
      load($item, fontFamily, text) {
        WebFont.load({
          google: {
            families: [fontFamily],
            text
          },
          fontactive() {
            $item.style.fontFamily = fontFamily
          }
        })
      }
    })
  },
  manage(resolve) {
    resolve({
      name: 'google',
      title: 'Google',
      icon: 'pj-icon pj-icon-google',
      fonts: [
        'Work Sans',
        'IBM Plex Sans',
        'Space Mono',
        'Libre Franklin',
        'Rubik',
        'Cormorant',
        'Fira Sans',
        'Eczar',
        'Alegreya Sans',
        'Alegreya'
      ],
      load($item, fontFamily, text) {
        WebFont.load({
          google: {
            families: [fontFamily],
            text
          }
        })

        $item.style.fontFamily = fontFamily
      }
    })
  }
})
