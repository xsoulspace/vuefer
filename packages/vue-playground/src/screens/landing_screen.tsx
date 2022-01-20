import { defineComponent, h } from 'vue'
import { Column, Scaffold } from '../../../vuefer/lib'
export const LandingScreen = defineComponent({
  name: 'landing_screen',
  setup() {
    return () =>
      h(
        Scaffold.build({
          body: Column({
            children: [],
          }),
        })
      )
  },
})
