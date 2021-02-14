import { NavigationController } from '@/abstract'
import { MultiProvider, Navigation } from '@/components'
import { h } from 'vue'
import { WrapperApp } from '../example/App'
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
