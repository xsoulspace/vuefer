// ABSTRACT WIDGET! DO NOT USE IT

import { BoxConstraints } from "@/abstract/BoxConstraints";
import { ButtonStyle } from "@/abstract/ButtonStyle";
import { Key } from "@/abstract/Key";
import { Component, defineComponent, h } from "vue";
import { Center } from "./Center";
import { ConstrainedBox } from "./ConstrainedBox";
import { InkWell } from "./InkWell";
import { Material } from "./Material";
import { Padding } from "./Padding";
export interface ButtonStyleButtonI {
  child: Component;
  key?: Key;
  style?: ButtonStyle;
  onPressed?: Maybe<GestureTapCallback>;
}
export const ButtonStyleButton = ({
  child,
  key,
  onPressed,
  style,
}: ButtonStyleButtonI) => {
  const isEnabled = onPressed != null;
  const constraints = new BoxConstraints({});
  const finalStyle = style ?? ButtonStyle.default;
  const {
    padding,
    backgroundColor,
    elevation,
    mouseCursor,
    overlayColor,
    shadowColor,
    borderRadius,
    focusColor,
    highlightColor,
    hoverColor,
    textStyle,
  } = finalStyle;

  const result = ConstrainedBox({
    constraints,
    child: Material({
      borderRadius,
      color: backgroundColor,
      elevation,
      textStyle,
      shadowColor,
      child: InkWell({
        focusColor,
        highlightColor,
        hoverColor,
        mouseCursor,
        overlayColor,
        onTap: onPressed ?? undefined,
        child: Padding({
          padding,
          child: Center({
            child: child,
          }),
        }),
      }),
    }),
  });

  return defineComponent({
    name: "ButtonStyleButton",
    render() {
      return h("div", { class: "" }, [h(result)]);
    },
  });
};
