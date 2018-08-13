const targetStack = []

class Dep {
  static target = null

  static pushTarget(_target) {
    targetStack.push(_target)
    this.target = _target
  }

  static popTarget() {
    this.target = targetStack.pop()
  }

  constructor() {
    this.watchers = new Set()
  }

  addWatcher(watcher) {
    this.watchers.add(watcher)
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify(value, oldValue) {
    // todo: avoid directly set value/oldValue
    this.watchers.forEach(watcher => watcher.run(value, oldValue))
  }
}

export default Dep
