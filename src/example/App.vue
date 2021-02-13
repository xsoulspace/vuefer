<script lang="ts">
import { h } from 'vue'
import { wrapperApp } from '../example/App'
import { MultiProvider } from '@/components'
import { HeroesModel } from './HeroesModel'
export default {
  setup() {
    return () =>
      h(
        MultiProvider.create({
          models: [HeroesModel],
          child: wrapperApp(),
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
