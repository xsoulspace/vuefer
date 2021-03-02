import { Component, defineComponent, h } from 'vue'

export const Scaffold = ({ body }: { body: Component }) => {
  return defineComponent({
    name: 'Scaffold',
    render() {
      return h('div', { class: '' }, h(body))
    },
  })
}
