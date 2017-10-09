let activeUpdate = null

class Dep {
  constructor () {
    this.subscribers = new Set()
  }
  depend () {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

function observe (obj) {
  const dep = new Dep()
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        dep.depend()
        return internalValue
      },
      set (newValue) {
        internalValue = newValue
        dep.notify()
      }
    })
  })
}

function autoRun (update) {
  function wrapperUpdate () {
    activeUpdate = update
    update()
    activeUpdate = null
  }
  wrapperUpdate()
}

const obj = { message: 'world' }
observe(obj)

const handlebars = require('handlebars')
const source = '<p>Hello, {{ message }}</p>'
const template = handlebars.compile(source)

autoRun(() => {
  console.log(template(obj))
  // print '<p>Hello, world</p>'
})

obj.message = 'you'
// print '<p>Hello, you</p>'
