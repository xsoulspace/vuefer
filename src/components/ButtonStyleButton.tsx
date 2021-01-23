// ABSTRACT WIDGET! DO NOT USE IT

import { SystemMouseCursor, SystemMouseCursors } from "@/abstract";
import { BoxConstraints } from "@/abstract/BoxConstraints";
import { ButtonStyle } from "@/abstract/ButtonStyle";
import { Key } from "@/abstract/Key";
import {
  OpacityDecoration,
  OpacityDecorationSteps,
} from "@/abstract/OpacityDecoration";
import { Component, defineComponent, h } from "vue";
import { ConstrainedBox } from "./ConstrainedBox";
import { InkWell } from "./InkWell";
import { Material } from "./Material";
import { Opacity } from "./Opacity";
import { Padding } from "./Padding";
export interface ButtonStyleButtonI {
  child: Component;
  key?: Key;
  style?: ButtonStyle;
  onTap?: GestureTapCallback;
}
export const ButtonStyleButton = ({
  child,
  key,
  onTap,
  style,
}: ButtonStyleButtonI) => {
  const isDisabled = onTap == null;
  const constraints = new BoxConstraints({});
  const finalStyle = style ?? ButtonStyle.default;
  const {
    padding,
    backgroundColor,
    elevation,
    mouseCursor,
    borderRadius,
    boxBorder,
    focusColor,
    highlightColor,
    hoverColor,
    textStyle,
  } = finalStyle;

  const materialWidget = Material({
    borderRadius,
    color: backgroundColor,
    elevation: elevation,
    textStyle,
    boxBorder,
    child: InkWell({
      focusColor,
      highlightColor,
      hoverColor,
      mouseCursor: isDisabled
        ? SystemMouseCursor.use({ cursor: SystemMouseCursors.basic })
        : mouseCursor,
      onTap,
      child: Padding({
        padding,
        child: child,
      }),
    }),
  });

  const result = ConstrainedBox({
    constraints,
    child: isDisabled
      ? Opacity({
          child: materialWidget,
          opacity: OpacityDecoration.use({
            opacity: OpacityDecorationSteps.s50,
          }),
        })
      : materialWidget,
  });
  return defineComponent({
    name: "ButtonStyleButton",
    render() {
      return h("div", { class: "relative" }, [h(result)]);
    },
  });
};
