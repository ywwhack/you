import observe from './observe'
import { updateNode } from './dom'
import Watcher from './Watcher'

export default class Component {
  init(data) {
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
    const { computed, watch } = this
    this.data = this.data && observe(this.data()) || {}
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
      this.props = data
    }

    // created hook
    const created = this.created
    if (created) this.proxy(created)()
  }
  // enable proxying component's data/computed props to this object
  proxy (fn) {
    return fn.bind(this.proxyObj)
  }
  _render () {
    const boundRender = this.proxy(this.render)
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
