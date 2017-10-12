import { observe, h, Component } from './lib'

const obj = { message: 'world' }

const Hello = {
  data () {
    return obj
  },
  render () {
    return <div>Hello {this.data.message}</div>
  }
}

const appDom = document.getElementById('app')
appDom.appendChild(<Hello />)

setTimeout(() => {
  obj.message = 'you'
}, 2000)
