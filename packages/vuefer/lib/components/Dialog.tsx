import { Component, computed, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { BorderRadius, BorderRadiusStep } from '../abstract/BorderRadius'
import { BoxDecoration } from '../abstract/BoxDecoration'
import { BoxShadow } from '../abstract/BoxShadow'
import { Color } from '../abstract/Color'
import { Colors } from '../abstract/Colors'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'
import { NavigationController } from '../abstract/Navigation'

interface DialogI {
  key?: Key
  backgroundColor?: Maybe<Color>
  elevation?: Maybe<BoxShadow>
  //  insetAnimationDuration
  //  insetAnimationCurve,
  insetPadding?: Maybe<EdgeInsets>
  decoration?: Maybe<BoxDecoration>
  child: Component
  _debugClasses?: Maybe<string>
}
/**
 * First, be sure that you've placed Navigation widget above
 * the widget what makes a call
 *
 * To open dialog you need to provide controller inside render or setup function
 *
 * ```typescript
 *  const controller = MultiProvider.get<NavigationController>(
 *     NavigationController
 *  )
 * ```
 */
export const showDialog = ({
  navigationController,
  dialog,
  fullscreen,
}: {
  dialog: Component
  navigationController: NavigationController
  fullscreen?: Maybe<boolean>
}) => {
  navigationController.push({ widget: dialog, fullscreen: fullscreen ?? false })
}

/**
 * Popup functionality with support via Navigation
 *
 *
 * Correct way to use Dialog via showDialog function
 *
 *  First - get NavigationController in setup
 *
 *  Be sure that you have Navigation widget on top of tree
 *
    ```typescript
    const navigationController = MultiProvider.get<NavigationController>(
      NavigationController
    )
    ```
 *
 *  Second - call a function inside for example Button.onTap:
 *
    ```typescript
    ElevatedButton({
      child: Text({
        text: ref('Show dialog'),
      }),
      onTap: () => {
        showDialog({
          builder: Dialog({
            child: Text({ text: ref('Hello World') }),
          }),
          navigationController,
        })
      },
    }),
    ```
 *
 * To close Dialog, just use `navigationController.pop()`
 */
export const Dialog = ({
  child,
  backgroundColor,
  decoration,
  elevation,
  insetPadding,
  _debugClasses,
}: DialogI) => {
  return defineComponent({
    name: 'Dialog',
    setup() {
      const classes = computed(() => {
        return [
          (backgroundColor ?? Colors.white).backgroundCss,
          (
            decoration ??
            new BoxDecoration({
              borderRadius: BorderRadius.all({
                radius: BorderRadiusStep.md,
              }),
            })
          ).css,
          (elevation ?? BoxShadow.lg).css,
          (insetPadding ?? EdgeInsets.all(EdgeInsetsStep.s10)).paddingCss,
          _debugClasses,
          'overflow-y-auto',
        ]
      })
      return () => h(<div class={classes.value}>{h(child)}</div>)
    },
  })
}
