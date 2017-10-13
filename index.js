import { h, Component, render } from './lib'

const Hello = {
  data () {
    return { message: 'world' }
  },
  computed: {
    anotherMessage () {
      return this.message + ' too'
    }
  },
  watch: {
    message (newValue) {
      console.log(`message changed to ${newValue}`)
    }
  },
  created () {
    setTimeout(() => {
      this.message = 'you'
    }, 2000)
  },
  render () {
    return (
      <div>
        <p>Hello {this.message}</p>
        <p>Hi {this.anotherMessage}</p>
      </div>
    )
  }
}

render(<Hello />, document.getElementById('app'))
