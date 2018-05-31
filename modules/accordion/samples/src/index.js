import Accordion from '@pluginjs/accordion'
import { queryAll } from '@pluginjs/dom'
import '@pluginjs/accordion/src/css/accordion.scss'
import '@pluginjs/icons/dist/plugin-icons.css'
import 'primary.css/css/primary.css'

queryAll('.accordion').map(el => Accordion.of(el))
