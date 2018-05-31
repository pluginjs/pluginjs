class DataParser {
  constructor(options, api) {
    this.templates = options.templates

    this.classes = api.classes
    this.options = api.options
    this.api = api
  }

  getLeaf(data) {
    const content = this.templates.leafContent(data)
    return `<li tabindex="${this.options.tabindex}">${content}</li>`
  }

  getBranch(data) {
    const branchHtml = this.api.getBranchHtml(data)
    const children = this.getTree(data.children)

    return `<li class="${this.classes.BRANCH}">${branchHtml}${children}</li>`
  }

  getNode(data) {
    if (data.children) {
      return this.getBranch(data)
    }
    return this.getLeaf(data)
  }

  getTree(data, isRoot) {
    let output = ''
    for (const i in data) {
      if ({}.hasOwnProperty.call(data, i)) {
        output += this.getNode(data[i])
      }
    }
    if (isRoot) {
      return `<ul class="${this.classes.NAMESPACE}">${output}</ul>`
    }
    return `<ul>${output}</ul>`
  }
}

export default DataParser
