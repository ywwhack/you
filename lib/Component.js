import observe from './observe'
import { updateNode } from './dom'
import Watcher from './Watcher'

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
        new Watcher(this.data, key, watch[key])
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
    let oldVNode
    let newVNode

    new Watcher(this.data, null, () => {
      oldVNode = newVNode
      newVNode = boundRender()

      if (oldVNode) {
        updateNode(newVNode, oldVNode)
      }
    }, { immediate: true })

    return newVNode
  }
}
