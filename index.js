import { observe, h, Component } from './lib'

const obj = { message: 'world' }
observe(obj)

class Hello extends Component {
  render () {
    return h('span', {}, `hello ${this.props.message}`)
  }
}

const appDom = document.getElementById('app')
appDom.appendChild(h(Hello, obj))

setTimeout(() => {
  obj.message = 'you'
}, 2000)
