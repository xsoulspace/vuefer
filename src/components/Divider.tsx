import { defineComponent, h } from 'vue'
import { DividerDecoration, DividerI } from '..'

// FIXME: it is not working because in tail wind
// there is no such class
export const Divider = (arg: DividerI) =>
  defineComponent({
    name: 'Divider',
    render() {
      return h('div', {
        class: DividerDecoration.horizontal(arg),
      })
    },
  })
