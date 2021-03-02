import { h } from 'vue'
import { MultiProvider, Navigation, NavigationController } from '../../../lib'
import { HeroesModel } from '../models/HeroesModel'
import { WrapperApp } from '../pages/App'
export const AppProvider = {
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
