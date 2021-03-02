import { HeroesModel } from '#/models/HeroesModel'
import { ScaffoldApp } from '#/pages/ScaffoldApp'
import { createApp } from 'vue'
import vueGridLayout from 'vue-grid-layout'
import { MultiProvider, Navigation, NavigationController } from '../../lib'
import '../../lib/index.scss'

const app = MultiProvider.build({
  models: [NavigationController, HeroesModel],
  child: Navigation({
    child: ScaffoldApp,
  }),
})

createApp(app).use(vueGridLayout).mount('#app')
