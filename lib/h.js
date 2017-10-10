import autoRun from './autoRun'

const HTML_TAGS = ['div', 'span']

function _h (tag, props, children) {
  let parentNode
  if (typeof tag === 'function') {
    // component
    const component = new tag(props)
    return component.render()
  } else if (HTML_TAGS.includes(tag)) {
    // normal tag - div/span/... etc.
    const parentNode = document.createElement(tag)
    if (children) {
      children.forEach(child => {
        parentNode.appendChild(child)
      })
    }
    return parentNode
  } else {
    // text
    return document.createTextNode(tag)
  }
}

export default function h (tag, props, children) {
  let oldNode
  let newNode
  autoRun(() => {
    oldNode = newNode
    newNode = _h(tag, props, children)

    if (oldNode) {
      const parentNode = oldNode.parentNode
      parentNode.removeChild(oldNode)
      parentNode.appendChild(newNode)
    }
  })
  return newNode
}
