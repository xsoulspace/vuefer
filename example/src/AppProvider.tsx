import { h } from 'vue'
import { MultiProvider, Navigation, NavigationController } from '../../lib'
import { WrapperApp } from './App'
import { HeroesModel } from './HeroesModel'
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
