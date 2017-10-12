import autoRun from './autoRun'
import observe from './observe'

export default class Component {
  constructor (options, data) {
    this.options = options
    this.data = options.data && observe(options.data())
    if (data) {
      this.props = data.props
    }
  }
  render () {
    const boundRender = this.options.render.bind(this)
    let oldNode
    let newNode
    
    autoRun(() => {
      oldNode = newNode
      newNode = boundRender()

      if (oldNode) {
        const parentNode = oldNode.parentNode
        parentNode.removeChild(oldNode)
        parentNode.appendChild(newNode)
      }
    })

    return newNode
  }
}
