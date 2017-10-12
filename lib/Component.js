import autoRun from './autoRun'
import observe from './observe'

export default class Component {
  constructor (options, data) {
    this.options = options

    // init data/computed
    this.data = options.data && observe(options.data()) || {}
    this.computed = {}
    const computed = options.computed
    if (computed) {
      Object.keys(computed).forEach(key => {
        Object.defineProperty(this.computed, key, {
          get: () => {
            return this.proxy(computed[key])()
          }
        })
      })
    }
    
    if (data) {
      this.props = data.props
    }

    // created hook
    const created = options.created
    if (created) this.proxy(created)()
  }
  // enable proxying component's data/computed props to this object
  proxy (fn) {
    if (!this.proxyThis) {
      this.proxyThis = new Proxy(this, {
        get (target, key) {
          return target[key] || target.data[key] || target.computed[key]
        },
        set (target, key, value) {
          if (target.data.hasOwnProperty(key)) {
            target.data[key] = value
          } else {
            target[key] = value
          }
          return true
        }
      })
    }
    return fn.bind(this.proxyThis)
  }
  render () {
    const boundRender = this.proxy(this.options.render)
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
