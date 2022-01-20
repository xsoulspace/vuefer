import { LandingScreen } from '#/screens/index'
// import vueGridLayout from 'vue-grid-layout'
import { MultiProvider, Provider } from '@xsoulspace/vue-provider'
import { createApp } from 'vue'
import '../../vuefer/dist/style.css'
import { NavigationController } from '../../vuefer/lib'
import { HeroesProvider } from './providers/HeroesProvider'

const wrappedApp = MultiProvider.render({
  child: LandingScreen,
  providers: [
    new Provider({
      abstract: NavigationController,
      builder: () => new NavigationController(),
    }),
    new Provider({
      abstract: HeroesProvider,
      builder: () => new HeroesProvider(),
    }),
  ],
})

createApp(wrappedApp).mount('#app')
