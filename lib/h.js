export default function h (type, data, ...children) {
  data = data || {}
  return {
    type,
    data,
    children
  }
}
