import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { Key } from '../abstract/Key'
import { SystemMouseCursor, SystemMouseCursors } from '../abstract/MouseCursor'

interface MouseRegionI {
  child: Component
  key?: Maybe<Key>
  cursor: SystemMouseCursors
}

// Defines cursor image
export const MouseRegion = ({ child, cursor }: MouseRegionI) => {
  const resolvedCursor = SystemMouseCursor.use({ cursor })
  return defineComponent({
    name: 'InkWell',
    render() {
      return h('div', { class: resolvedCursor.css }, [h(child)])
    },
  })
}
