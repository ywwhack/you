import Dep from './Dep'

export default function observe (obj) {
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
