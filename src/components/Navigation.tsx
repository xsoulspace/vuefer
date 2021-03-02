import { Component, defineComponent, h, reactive, ref, watch } from 'vue'
import { Colors } from '../abstract/Colors'
import { EdgeInsetsStep } from '../abstract/EdgeInsets'
import {
  NavigationController,
  NavigationControllerRoute,
} from '../abstract/Navigation'
import {
  OpacityDecoration,
  OpacityDecorationSteps,
} from '../abstract/OpacityDecoration'
import { SizedBoxHeight, SizedBoxWidth } from '../abstract/SizedBox'
import { Center } from './Center'
import { Positioned } from './Positioned'
import { MultiProvider } from './Provider'
import { Visibility } from './Visibility'
import VueTeleport from './VueTeleport.vue'
interface NavigationI {
  child: Component
}
/**
 * This class provides a way to render and manage routes
 * above current screen
 *
 * To use this widget place NavigationController in MultiProvider
 * in widgets tree as high as possible
 *
 * Add controller into MultiPorvider and Navigation widget below:
 *
 *  ```typescript
 *  MultiProvider.create({
 *    models: [NavigationController, ...],
 *    child: Navigation({
 *      child: ...,
 *    }),
 *  })
 *  ```
 */
export const Navigation = ({ child }: NavigationI) => {
  return defineComponent({
    name: 'Navigation',
    components: {
      VueTeleport,
    },
    setup() {
      const routeController = MultiProvider.get<NavigationController>(
        NavigationController
      )
      const currentRoute = reactive<NavigationControllerRoute>({
        widget: null,
        fullscreen: true,
        routeName: '',
      })
      const isRoutesExists = ref<boolean>(false)
      const isFullscreen = ref<boolean>(false)
      const isNotFullscreen = ref<boolean>(false)

      watch(
        routeController.routes,
        (newRoutes) => {
          const newRoute = newRoutes[0]
          if (newRoute == null) {
            isRoutesExists.value = false
            currentRoute.widget = null
            return
          }
          currentRoute.widget = newRoute.widget
          currentRoute.routeName = newRoute.routeName
          currentRoute.fullscreen = newRoute.fullscreen
          isNotFullscreen.value = !newRoute.fullscreen
          isFullscreen.value = newRoute.fullscreen
          isRoutesExists.value = true
        },
        {
          deep: true,
          immediate: true,
        }
      )

      return {
        isFullscreen,
        currentRoute,
        isNotFullscreen,
        isRoutesExists,
        routeController,
      }
    },
    render() {
      return h('div', {}, [
        h(child),
        h(
          Visibility({
            visible: ref(this.isRoutesExists),
            child: h(
              <vue-teleport to="#app">
                {h(
                  Positioned({
                    _zIndex: this.routeController._backgroundZIndex.value,
                    bottom: EdgeInsetsStep.zero,
                    left: EdgeInsetsStep.zero,
                    right: EdgeInsetsStep.zero,
                    top: EdgeInsetsStep.zero,
                    child: h(
                      <>
                        {h(
                          Visibility({
                            child: h(
                              <div
                                class={[
                                  Colors.black.backgroundCss,
                                  OpacityDecoration.use({
                                    opacity: OpacityDecorationSteps.s50,
                                  }).css,
                                  new SizedBoxWidth({}).css,
                                  new SizedBoxHeight({}).css,
                                ]}
                              ></div>
                            ),
                            visible: ref(this.isNotFullscreen),
                          })
                        )}
                        {h(
                          Visibility({
                            child: (
                              <div
                                style={`z-index: ${this.routeController._routeZIndex.value};`}
                                onClick={() => {
                                  this.routeController.pop()
                                }}
                              >
                                {h(
                                  Center({
                                    child: h(
                                      <div
                                        onClick={(event) =>
                                          event.stopPropagation()
                                        }
                                      >
                                        {h(this.currentRoute.widget ?? <div />)}
                                      </div>
                                    ),
                                  })
                                )}
                              </div>
                            ),
                            visible: ref(this.isNotFullscreen),
                          })
                        )}
                        {h(
                          Visibility({
                            child: (
                              <div
                                style={`z-index: ${this.routeController._routeZIndex.value};`}
                                class={[
                                  new SizedBoxWidth({}).css,
                                  new SizedBoxHeight({}).css,
                                ]}
                              >
                                {h(this.currentRoute.widget ?? <div />)}
                              </div>
                            ),
                            visible: ref(this.isFullscreen),
                          })
                        )}
                      </>
                    ),
                  })
                )}
              </vue-teleport>
            ),
          })
        ),
      ])
    },
  })
}
