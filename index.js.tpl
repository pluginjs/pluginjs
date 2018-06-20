import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Accordion from '@pluginjs/accordion'

const element = query('.accordion', render(html, query('#default')))
Accordion.of(element, {
  /** options **/
})
,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  },
  INFO
)
class Accordion extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() { ... }

  bind() { ... }

  enable() { ... }

  disable() { ... }

  destroy() { ... }
}

export default Accordion
