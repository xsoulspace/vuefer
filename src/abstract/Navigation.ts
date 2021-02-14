import { Container } from '@/components'
import { Component, markRaw, reactive, ref } from 'vue'
import { Maybe } from './BasicTypes'

interface NavigationControllerRoute {
  routeName: string
  widget: Component
  fullscreen: boolean
}

export class NavigationController {
  _backgroundZIndex = ref(100)
  _routeZIndex = ref(110)
  routes = reactive<Maybe<NavigationControllerRoute>[]>([])

  pop(counter = 1) {
    for (let i = 0; i < counter; i++) {
      if (this.routes.length == 0) return
      this.routes.shift()
    }
  }
  push<T extends Component>({
    widget,
    fullscreen,
  }: {
    widget: T
    fullscreen?: Maybe<boolean>
  }) {
    this.routes.unshift({
      routeName: '',
      widget: markRaw(widget),
      fullscreen: fullscreen ?? true,
    })
  }
  currentRoute(): NavigationControllerRoute {
    const maybeWidget = this.routes[0]
    return (
      maybeWidget ?? {
        widget: Container({}),
        fullscreen: true,
        routeName: '',
      }
    )
  }
}
