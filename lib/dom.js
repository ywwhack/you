import Component from './Component'
import h from './h'

const HTML_TAGS = ['div', 'span', 'p', 'button']

export function createNode (vNode) {
  if (typeof vNode === 'string') {
    // transform text to vNode
    vNode = h(vNode)
  }

  const { type, data, children } = vNode
  let rootNode
  if (typeof type === 'function') {
    // component
    const component = new type()
    component.init(data)
    rootNode = createNode(component._render())
  } else if (HTML_TAGS.includes(type)) {
    // normal tag - div/span/... etc.
    rootNode = document.createElement(type)
    // collect events
    // TODO: remove event listeners before dom removed
    Object.keys(data).forEach(key => {
      if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase()
        rootNode.addEventListener(eventName, data[key], false)
      }
    })
    if (children && children.length) {
      children.forEach(child => {
        rootNode.appendChild(createNode(child))
      })
    }
  } else {
    // text node
    rootNode = document.createTextNode(vNode.type)
  }

  vNode.rootNode = rootNode
  return rootNode
}

export function updateNode (newVNode, oldVNode) {
  // TODO: optimize according patch algorithm
  const parentNode = oldVNode.rootNode.parentNode
  parentNode.removeChild(oldVNode.rootNode)
  parentNode.appendChild(createNode(newVNode))
}

export function render (vNode, mountedNode) {
  mountedNode.appendChild(createNode(vNode))
}
