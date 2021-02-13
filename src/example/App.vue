<script lang="ts">
import { h } from 'vue'
import { WrapperApp } from '../example/App'
import { MultiProvider, Navigation } from '@/components'
import { HeroesModel } from './HeroesModel'
import { NavigationController } from '@/abstract'
export default {
  setup() {
    return () =>
      h(
        MultiProvider.create({
          models: [HeroesModel, NavigationController],
          child: Navigation({
            child: WrapperApp(),
          }),
        })
      )
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
