import { Component, defineComponent, h, Ref } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { GestureTapCallback, Maybe } from '../abstract/BasicTypes'
import { Color } from '../abstract/Color'
import { Colors } from '../abstract/Colors'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'
import { SystemMouseCursors } from '../abstract/MouseCursor'
import {
  OpacityDecoration,
  OpacityDecorationSteps,
} from '../abstract/OpacityDecoration'
import { Align } from './Align'
import { Column } from './Column'
import { Container } from './Container'
import { InkWell } from './InkWell'
import { Opacity } from './Opacity'
import { Padding } from './Padding'
import { Row } from './Row'

interface ListTileI {
  key?: Maybe<Key>
  leading?: Maybe<Component>
  title: Component
  subtitle?: Maybe<Component>
  trailing?: Maybe<Component>
  // isThreeLine
  // dense,
  // visualDensity,
  // shape,
  contentPadding?: Maybe<EdgeInsets>
  enabled?: Maybe<Ref<boolean>>
  onTap?: Maybe<GestureTapCallback>
  // onLongPress,
  mouseCursor?: Maybe<SystemMouseCursors>
  selected?: Maybe<Ref<boolean>>
  focusColor?: Maybe<Color>
  hoverColor?: Maybe<Color>
  // focusNode,
  // autofocus = false,
  tileColor?: Maybe<Color>
  selectedTileColor?: Maybe<Color>
  // enableFeedback,
  // horizontalTitleGap,
  // minVerticalPadding,
  // minLeadingWidth,
}

export const ListTile = ({
  key,
  mouseCursor,
  hoverColor,
  focusColor,
  contentPadding,
  enabled,
  leading,
  onTap,
  selected,
  subtitle,
  tileColor,
  title,
  selectedTileColor,
  trailing,
}: ListTileI) => {
  const resolvedSelectedTileColor = selectedTileColor ?? Colors.indigo
  // const resolvedTileColor = tileColor ?? Colors.white;
  // FIXME: hover is not working with bg-color
  const tileBackgroundColor =
    selected?.value == true ? resolvedSelectedTileColor : Colors.transparent
  // const tileBackgroundColor = selected
  //   ? resolvedSelectedTileColor
  //   : resolvedTileColor
  const hasLeading = leading != null
  const resolvedLeading = leading ?? <div />
  const hasSubtitle = subtitle != null
  const resolvedHeight = hasSubtitle ? EdgeInsetsStep.s20 : EdgeInsetsStep.s14
  const resolvedTrailing = (() => {
    if (trailing != null) {
      return Align({
        alignment: Alignment.centerRight,
        child: Padding({
          padding: EdgeInsets.symmetric({
            horizontal: EdgeInsetsStep.s2,
          }),
          child: trailing,
        }),
      })
    } else {
      return <div />
    }
  })()
  const resolvedSubtitle = subtitle ?? <div />
  const resolvedTitleWidget = (() => {
    if (hasSubtitle) {
      return Column({
        children: [title, resolvedSubtitle],
      })
    } else {
      return title
    }
  })()

  const resolvedContentWidget = (() => {
    if (hasLeading) {
      return Padding({
        padding: EdgeInsets.only({ left: EdgeInsetsStep.s2 }),
        child: resolvedTitleWidget,
      })
    } else {
      return resolvedTitleWidget
    }
  })()

  const resolvedHoverColor = hoverColor ?? Colors.indigo

  return defineComponent({
    name: 'ListTile',
    setup() {
      return {
        mouseCursor,
        hoverColor,
        resolvedHoverColor,
        focusColor,
        contentPadding,
        enabled,
        selected,
        tileColor,
        tileBackgroundColor,
        selectedTileColor,
      }
    },
    render() {
      const isEnabled = enabled?.value == true || enabled == null
      const isNotEnabled = enabled?.value == false
      const resolvedMouseCursor = (() => {
        if (isEnabled || onTap != null) {
          return mouseCursor ?? SystemMouseCursors.click
        } else {
          return SystemMouseCursors.basic
        }
      })()
      const result = InkWell({
        mouseCursor: resolvedMouseCursor,
        onTap: isEnabled ? onTap : null,
        focusColor,
        hoverColor: isNotEnabled ? Colors.transparent : resolvedHoverColor,
        child: Container({
          padding: contentPadding ?? EdgeInsets.all(EdgeInsetsStep.s4),
          color: isNotEnabled ? Colors.grey : tileBackgroundColor,
          height: resolvedHeight,
          child: Row({
            children: [
              resolvedLeading,
              resolvedContentWidget,
              resolvedTrailing,
            ],
          }),
        }),
      })
      return h(
        isNotEnabled
          ? Opacity({
              child: result,
              opacity: OpacityDecoration.use({
                opacity: OpacityDecorationSteps.s50,
              }),
            })
          : result
      )
    },
  })
}
