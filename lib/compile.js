import handlebars from 'handlebars/dist/handlebars.js'
import autoRun from './autoRun'

const originalCompile = handlebars.compile.bind(handlebars)

export default function compile (source) {
  const template = originalCompile(source)
  return function reactivityTemplate (data, update) {
    let result
    autoRun(() => {
      result = template(data)
      update(result)
    })
  }
}
