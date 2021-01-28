import { DividerDecoration, DividerI } from '@/abstract/DividerDecoration'
import { defineComponent, h } from 'vue'

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
