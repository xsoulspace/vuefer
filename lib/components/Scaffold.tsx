import { Component, computed, defineComponent, h } from 'vue'
import {
  Maybe,
  NavigationController,
  SizeBoxStep,
  SizedBoxHeight,
} from '../abstract'
import { MultiProvider } from './Provider'

export class Scaffold {
  static _drawer?: Maybe<Component>
  static openDrawer: CallableFunction
  static build({
    body,
    appBar,
    drawer,
  }: {
    body: Component
    appBar?: Maybe<Component>
    drawer?: Maybe<Component>
  }) {
    Scaffold._drawer = drawer
    return defineComponent({
      name: 'Scaffold',
      setup() {
        const isAppBarExists = computed(() => appBar != null)
        const classes = computed((): string[] => {
          return [
            isAppBarExists.value ? 'relative' : '',
            new SizedBoxHeight({ height: SizeBoxStep.screen }).css,
          ]
        })
        const navigationController = MultiProvider.get<NavigationController>(
          NavigationController
        )

        return () =>
          h('div', {}, [
            h(appBar ?? <div />),
            h('div', { class: classes.value }, [h(body)]),
          ])
      },
    })
  }
}
