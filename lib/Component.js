import autoRun from './autoRun'
import observe from './observe'

export default class Component {
  constructor (options, data) {
    this.options = options

    // init data/computed
    this.data = options.data && observe(options.data())
    this.computed = {}
    const computed = options.computed
    if (computed) {
      Object.keys(computed).forEach(key => {
        Object.defineProperty(this.computed, key, {
          get: () => {
            return computed[key].bind(this)()
          }
        })
      })
    }
    
    if (data) {
      this.props = data.props
    }

    // created hook
    const created = options.created
    if (created) created.bind(this)()
  }
  render () {
    const boundRender = this.options.render.bind(this)
    let oldNode
    let newNode
    
    autoRun(() => {
      oldNode = newNode
      newNode = boundRender()

      if (oldNode) {
        const parentNode = oldNode.parentNode
        parentNode.removeChild(oldNode)
        parentNode.appendChild(newNode)
      }
    })

    return newNode
  }
}
