import Dep from './Dep'

export default function observe (obj) {
  if (obj.__dep__) return obj

  const dep = new Dep()
  obj.__dep__ = dep

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

  return obj
}
