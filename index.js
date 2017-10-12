import { observe, h, Component } from './lib'

const Hello = {
  data () {
    return { message: 'world' }
  },
  computed: {
    anotherMessage () {
      return this.data.message + ' too'
    }
  },
  created () {
    setTimeout(() => {
      this.data.message = 'you'
    }, 2000)
  },
  render () {
    return (
      <div>
        <p>Hello {this.data.message}</p>
        <p>Hi {this.computed.anotherMessage}</p>
      </div>
    )
  }
}

const appDom = document.getElementById('app')
appDom.appendChild(<Hello />)
