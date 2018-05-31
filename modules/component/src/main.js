function datasetParse(dataset) {
  const data = Object.entries(dataset).reduce((result, [k, v]) => {
    try {
      const content = JSON.parse(`{"data": ${v.replace(/'/g, '"')}}`).data
      return {
        ...result,
        [k]: content
      }
    } catch (err) {
      return {
        ...result,
        [k]: v
      }
    }
  }, {})
  return data
}

class Plugin {
  constructor(namespace, element) {
    this.plugin = namespace
    this.element = element
    if (!window.Pj) {
      throw new Error('Pluginjs must be required!')
    }
    if (window.Pj && window.Pj.instances[this.plugin]) {
      if (
        window.Pj.instances[this.plugin].find(
          instance => instance.element === this.element
        )
      ) {
        throw new Error(
          `${this.plugin} has been installed on this element.\n\nElement: ${
            this.element.outerHTML
          }\n`
        )
      }
      window.Pj.instances[this.plugin].push(this)
    }
  }

  getDataOptions() {
    return datasetParse(this.element.dataset)
    // const data = this.element.dataset
    // const length = Object.keys(data).length
    // const newData = {}

    // if (length > 0) {
    //   Object.entries(data).forEach(([name, content]) => {
    //     let cache = {}
    //     const items = name.split('-')
    //     // let items = name.split('-');

    //     const deep = items.length

    //     if (deep > 1) {
    //       let buffer = {}

    //       for (let j = 0; j < deep; j++) {
    //         const item =
    //           items[j].substring(0, 1).toLowerCase() + items[j].substring(1)

    //         if (j === 0) {
    //           buffer = {}
    //           cache[item] = {}
    //         } else if (j === deep - 1) {
    //           buffer[item] = content
    //         } else {
    //           buffer = {}
    //           buffer[item] = {}
    //         }
    //       }
    //     } else if (
    //       items[0] ===
    //       `as${this.plugin
    //         .substring(0, 1)
    //         .toUpperCase()}${this.plugin.substring(1)}`
    //     ) {
    //       cache = content
    //     } else {
    //       cache[name] = content
    //     }

    //     Object.assign(newData, cache)
    //   })
    // }

    // return newData
  }

  static of(...args) {
    return new this(...args)
  }

  destroy() {
    this.plugin = null
    this.element = null
    if (window.Pj && window.Pj.instances[this.plugin]) {
      window.Pj.instances[this.plugin] = window.Pj.instances[
        this.plugin
      ].filter(plugin => plugin.element === this.element)
    }
  }
}

export default Plugin
