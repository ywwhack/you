import Dep from './Dep'

export default class Watcher {
  constructor(obj, key, callback, options = {}) {
    // key 没有指定，此时的 watcher 是 render watcher
    let isRenderWatcher = false
    if (key == null) {
      isRenderWatcher = true
    }
    this.callback = callback

    // collect dependence
    Dep.target = this
    let value
    if (isRenderWatcher) {
      // iterate all props in order to trigger dependence collection
      for (let key in obj) {
        obj[key]
      }
    } else {
      value = obj[key]
    }
    Dep.target = null
    
    if (options.immediate) {
      this.run(value, null)
    }
  }

  run(value, oldValue) {
    this.callback(value, oldValue)
  }
}
