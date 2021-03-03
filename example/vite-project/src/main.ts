import { HeroesModel } from '#/models/HeroesModel'
import { ScaffoldApp } from '#/pages/ScaffoldApp'
import {
  MultiProvider,
  Navigation,
  NavigationController,
} from '@xsoulspace/vuefer'
import '@xsoulspace/vuefer/style.css'
import { createApp } from 'vue'
import vueGridLayout from 'vue-grid-layout'

const app = MultiProvider.build({
  models: [NavigationController, HeroesModel],
  child: Navigation({
    child: ScaffoldApp,
  }),
})

createApp(app).use(vueGridLayout).mount('#app')
