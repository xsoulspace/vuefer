import { Component, computed, defineComponent, h } from '@vue/runtime-core'
import { ref } from 'vue'
import { Colors } from '../abstract/Colors'
import { EdgeInsetsStep } from '../abstract/EdgeInsets'
import { NavigationController } from '../abstract/Navigation'
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

      const isRoutesExists = computed(() => routeController.count > 0)

      const isFullscreen = computed(() => routeController.isFullscreen)
      const isNotFullscreen = computed(() => routeController.isNotFullscreen)

      return { isFullscreen, isNotFullscreen, isRoutesExists, routeController }
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
                                        {h(this.routeController.currentWidget)}
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
                                {h(this.routeController.currentWidget)}
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
