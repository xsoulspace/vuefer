import { defineComponent, h } from 'vue'

export const AppBar = () => {
  return defineComponent({
    name: 'AppBar',
    setup() {
      return () =>
        h(
          <nav>
            <div></div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </nav>
        )
    },
  })
}
