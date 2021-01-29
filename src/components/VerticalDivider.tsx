import { defineComponent, h } from 'vue'
import { DividerDecoration, DividerI } from '../abstract/DividerDecoration'

// FIXME: it is not working because in tail wind
// there is no such class
export const VerticalDivider = (arg: DividerI) =>
  defineComponent({
    name: 'VerticalDivider',
    render() {
      return h('div', {
        class: DividerDecoration.vertical(arg),
      })
    },
  })
