import { observe, autoRun, compile } from './lib'

const obj = { message: 'world' }
observe(obj)

const source = '<p>Hello, {{ message }}</p>'

const appDom = document.getElementById('app')
compile(source)(obj, result => {
  appDom.innerHTML = result
})

setTimeout(() => {
  obj.message = 'you'
}, 2000)
