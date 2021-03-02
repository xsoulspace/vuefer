import { Component, computed, defineComponent, h } from 'vue'
import { Maybe } from '../abstract'

export const Scaffold = ({
  body,
  appBar,
}: {
  body: Component
  appBar?: Maybe<Component>
}) => {
  return defineComponent({
    name: 'Scaffold',
    setup() {
      const isAppBarExists = computed(() => appBar != null)

      return () =>
        h('div', { class: '' }, [
          h(appBar ?? <div />),
          h('div', { class: isAppBarExists.value ? 'relative' : '' }, [
            h(body),
          ]),
        ])
    },
  })
}
