import Component from './Component'

const HTML_TAGS = ['div', 'span', 'p']

export default function h (tag, data, ...children) {
  let parentNode
  if (tag instanceof HTMLElement) {
    // just return dom if passed
    return tag
  } else if (typeof tag === 'object') {
    // component
    const component = new Component(tag, data)
    return component.render()
  } else if (HTML_TAGS.includes(tag)) {
    // normal tag - div/span/... etc.
    const parentNode = document.createElement(tag)
    if (children && children.length) {
      children.forEach(child => {
        parentNode.appendChild(h(child))
      })
    }
    return parentNode
  } else {
    // text
    return document.createTextNode(tag)
  }
}
