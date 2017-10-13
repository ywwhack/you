import autoRun from './autoRun'
import observe from './observe'

export default class Component {
  constructor (options, data) {
    this.options = options

    // setup proxy's object
    this.proxyObj = new Proxy(this, {
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

    // init data/computed/watch
    const { computed, watch } = options
    this.data = options.data && observe(options.data()) || {}
    this.computed = {}
    if (computed) {
      Object.keys(computed).forEach(key => {
        Object.defineProperty(this.computed, key, {
          get: () => {
            return this.proxy(computed[key])()
          }
        })
      })
    }
    if (watch) {
      Object.keys(watch).forEach(key => {
        let firstCall = true
        let oldValue
        const originWatcher = watch[key]
        const wrapperWatcher = () => {
          const newValue = this.proxyObj[key]
          if (firstCall) {
            firstCall = false
          } else {
            originWatcher(newValue, oldValue)
            oldValue = newValue
          }
        }
        autoRun(wrapperWatcher)
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
    return fn.bind(this.proxyObj)
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
