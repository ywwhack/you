import { h, Component, render } from './lib'

class Hello extends Component {
  data () {
    return { message: 'world' }
  }

  computed = {
    anotherMessage () {
      return this.message + ' too'
    }
  }

  watch = {
    message (newValue) {
      console.log(`message changed to ${newValue}`)
    }
  }

  created () {
    setTimeout(() => {
      this.message = 'you'
    }, 2000)
  }

  render () {
    return (
      <div onClick={this.props.onClick}>
        <p>Hello {this.message}</p>
        <p>Hi {this.anotherMessage}</p>
        <button onClick={() => console.log(this.message)}>触发事件</button>
      </div>
    )
  }
}

render(<Hello onClick={() => {console.log('父组件事件')}} />, document.getElementById('app'))
