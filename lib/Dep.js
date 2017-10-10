class Dep {
  constructor () {
    this.subscribers = new Set()
  }
  depend () {
    if (Dep.target) {
      this.subscribers.add(Dep.target)
    }
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

Dep.target = null

export default Dep
