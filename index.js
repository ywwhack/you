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

const handlebars = require('handlebars/dist/handlebars.js')
const originalCompile = handlebars.compile.bind(handlebars)
function compile (source) {
  const template = originalCompile(source)
  return function reactivityTemplate (data, update) {
    let result
    autoRun(() => {
      result = template(data)
      update(result)
    })
  }
}

const source = '<p>Hello, {{ message }}</p>'

const appDom = document.getElementById('app')
compile(source)(obj, result => {
  appDom.innerHTML = result
})

setTimeout(() => {
  obj.message = 'you'
}, 2000)
