import { Component, markRaw, reactive, ref } from 'vue'
import { Alignment } from './Alignment'
import { Maybe } from './BasicTypes'

export interface NavigationControllerRoute {
  routeName: string
  widget: Maybe<Component>
  fullscreen: boolean
  alignment?: Maybe<Alignment>
}

export class NavigationController {
  _backgroundZIndex = ref(100)
  _routeZIndex = ref(110)
  get _alignment() {
    return this.routes[0]?.alignment ?? Alignment.center
  }
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
    alignment,
  }: {
    widget: T
    fullscreen?: Maybe<boolean>
    alignment?: Maybe<Alignment>
  }) {
    this.routes.unshift({
      routeName: '',
      widget: markRaw(widget),
      fullscreen: fullscreen ?? true,
      alignment,
    })
  }
}
