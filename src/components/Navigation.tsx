import {
  Component,
  computed,
  defineComponent,
  h,
  Teleport,
} from '@vue/runtime-core'
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

interface NavigationI {
  child: Component
}
/**
 * This class provides a way to render and manage routes
 * above current screen
 *
 * To use this widget place NavigationController in MultiProvider
 * in widgets tree as high as possible
 */
export const Navigation = ({ child }: NavigationI) => {
  return defineComponent({
    name: 'Navigation',

    setup() {
      const routeController = MultiProvider.get<NavigationController>(
        NavigationController
      )

      const isRoutesExists = computed(() => routeController.count > 0)
      const isFullscreen = computed(() => routeController._isFullscreen)
      const isNotFullscreen = computed(() => routeController._isNotFullscreen)
      return () =>
        h('div', {}, [
          h(child),
          h(
            Visibility({
              visible: isRoutesExists,
              child: h(
                <Teleport to="body">
                  {h(
                    Positioned({
                      _zIndex: routeController._backgroundZIndex.value,
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
                              visible: isNotFullscreen,
                            })
                          )}
                          {h(
                            Visibility({
                              child: (
                                <div
                                  style={`z-index: ${routeController._routeZIndex.value};`}
                                  onClick={() => {
                                    routeController.pop()
                                  }}
                                >
                                  {routeController._currentWidget ? (
                                    h(
                                      Center({
                                        child: h(
                                          <div
                                            onClick={(event) =>
                                              event.stopPropagation()
                                            }
                                          >
                                            {h(routeController._currentWidget)}
                                          </div>
                                        ),
                                      })
                                    )
                                  ) : (
                                    <div />
                                  )}
                                </div>
                              ),
                              visible: isNotFullscreen,
                            })
                          )}
                          {h(
                            Visibility({
                              child: (
                                <div
                                  style={`z-index: ${routeController._routeZIndex.value};`}
                                  class={[
                                    new SizedBoxWidth({}).css,
                                    new SizedBoxHeight({}).css,
                                  ]}
                                >
                                  {routeController._currentWidget ? (
                                    h(routeController._currentWidget)
                                  ) : (
                                    <div />
                                  )}
                                </div>
                              ),
                              visible: isFullscreen,
                            })
                          )}
                        </>
                      ),
                    })
                  )}
                </Teleport>
              ),
            })
          ),
        ])
    },
  })
}
