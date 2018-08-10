class Dep {
  constructor () {
    this.watchers = new Set()
  }
  depend () {
    if (Dep.target) {
      this.watchers.add(Dep.target)
    }
  }
  notify (value, oldValue) {
    this.watchers.forEach(watcher => watcher.run(value, oldValue))
  }
}

Dep.target = null

export default Dep
