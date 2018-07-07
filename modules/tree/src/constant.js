import is from '@pluginjs/is'

export const namespace = 'tree'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CLOSE: 'close',
  OPEN: 'open',
  SELECT: 'select',
  UNSELECT: 'unselect'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  TREE: '{namespace}',
  TOGGLER: '{namespace}-toggler',
  BRANCH: '{namespace}-branch',
  OPEN: '{namespace}-open',
  SELECTED: '{namespace}-selected',
  CHILDRENSELECTED: '{namespace}-childrenSelected'
}

export const methods = [
  'open',
  'close',
  'before',
  'after',
  'append',
  'prepend',
  'remove',
  'getRoot',
  'getSelected',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
  theme: null,
  autoOpen: [1, 2], // true/false/1/2...
  keyboard: true, // Support keyboard navigation.
  dataFromHtml: false,
  data: null,
  multiSelect: false,
  canUnselect: true,
  tabindex: 0,

  templates: {
    toggler() {
      return '<i class="pj-tree-toggler"></i>'
    },
    icon(className) {
      return `<i class="${className} pj-tree-icon"></i>`
    },
    branch() {
      return '<div class="pj-tree-element" tabindex="{tabindex}">{toggler}<div class="element-content">{branchContent}</div></div>'
    },
    branchContent(node) {
      if (typeof node === 'object') {
        return node.name
      }
      return node
    },
    leaf(node) {
      const content = this.leafContent(node)

      return content
    },
    leafContent(node) {
      if (is.object(node)) {
        return node.name
      }
      return node
    }
  }
}
