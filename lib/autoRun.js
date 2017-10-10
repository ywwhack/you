import Dep from './Dep'

export default function autoRun (update) {
  function wrapperUpdate () {
    Dep.target = update
    update()
    Dep.target = null
  }
  wrapperUpdate()
}
