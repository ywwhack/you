import { observe, h, Component } from './lib'

const obj = { message: 'world' }
observe(obj)

class Hello extends Component {
  render () {
    return <div>Hello {this.props.message}</div>
  }
}

const appDom = document.getElementById('app')
appDom.appendChild(h(Hello, obj))

setTimeout(() => {
  obj.message = 'you'
}, 2000)
