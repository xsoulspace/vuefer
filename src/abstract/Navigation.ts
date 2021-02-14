import { Component, markRaw, reactive, ref } from 'vue'
import { Maybe } from './BasicTypes'

export class NavigationController {
  _backgroundZIndex = ref(100)
  _routeZIndex = ref(110)
  routes = reactive<
    Maybe<{ routeName: string; widget: Component; fullscreen: boolean }>[]
  >([])

  pop(counter = 1) {
    for (let i = 0; i < counter; i++) {
      if (this.count == 0) return
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
  get _currentRoute() {
    return this.routes[0]
  }
  get _currentWidget(): Maybe<Component> {
    return this._currentRoute?.widget
  }
  get _isFullscreen() {
    const maybeFullscreen = this._currentRoute?.fullscreen
    return maybeFullscreen == null || maybeFullscreen == true
  }
  get _isNotFullscreen() {
    return !this._isFullscreen
  }
  get count() {
    return this.routes.length
  }
}
