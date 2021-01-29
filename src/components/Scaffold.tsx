import { Component, defineComponent, h } from 'vue'

export const Scaffold = ({ body }: { body: Component }) => {
  return defineComponent({
    render() {
      return h('div', { class: 'min-h-screen relative leading-tight' }, h(body))
    },
  })
}
