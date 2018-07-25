import Component from '@pluginjs/component'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
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
@optionable(true)
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  }
)
class {{Namespace}} extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {}

  bind() {}

  unbind() {}

  enable() {}

  disable() {}

  destroy() {}
}

export default {{Namespace}}
