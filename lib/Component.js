export default class Component {
  constructor (props) {
    this.props = props
  }
  render () {
    throw 'Component should\'n return return empty dom!'
  }
}
