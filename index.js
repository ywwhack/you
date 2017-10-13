import { observe, h, Component } from './lib'

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

const appDom = document.getElementById('app')
appDom.appendChild(<Hello />)
