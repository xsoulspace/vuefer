import { BorderRadius, BorderRadiusStep } from "./BorderRadius";
import { BoxShadowSize } from "./BoxShadow";
import { Color } from "./Color";
import { Colors } from "./Colors";
import { EdgeInsets, EdgeInsetsStep } from "./EdgeInsets";
import { SystemMouseCursor, SystemMouseCursors } from "./MouseCursor";
import { TextStyle } from "./TextStyle";

interface ButtonStyleI {
  textStyle?: TextStyle;
  backgroundColor?: Color;
  foregroundColor?: Color;
  overlayColor?: Color;
  shadowColor?: Color;
  elevation?: BoxShadowSize;
  padding?: EdgeInsets;
  mouseCursor?: SystemMouseCursor;
  borderRadius?: BorderRadius;
  focusColor?: Color;
  highlightColor?: Color;
  hoverColor?: Color;
  // minimumSize?: ?>
  // side?: BorderSide;
  // shape: OutlinedBorder?>
  // animationDuration?: Duration
}

export class ButtonStyle {
  textStyle: TextStyle;
  backgroundColor: Color;
  foregroundColor: Color;
  overlayColor: Color;
  shadowColor: Color;
  elevation: BoxShadowSize;
  padding: EdgeInsets;
  mouseCursor: SystemMouseCursor;
  borderRadius: BorderRadius;
  focusColor: Color;
  highlightColor: Color;
  hoverColor: Color;
  // minimumSize?: ?>
  // side?: BorderSide;
  // shape: OutlinedBorder?>
  // animationDuration?: Duration
  constructor({
    backgroundColor,
    elevation,
    foregroundColor,
    mouseCursor,
    overlayColor,
    padding,
    shadowColor,
    borderRadius,
    focusColor,
    highlightColor,
    hoverColor,
    textStyle,
  }: ButtonStyleI) {
    this.textStyle = textStyle ?? TextStyle.default;
    this.backgroundColor = backgroundColor ?? Colors.transparent;
    this.foregroundColor = foregroundColor ?? Colors.black;
    this.overlayColor = overlayColor ?? Colors.transparent;
    this.shadowColor = shadowColor ?? Colors.transparent;
    this.elevation = elevation ?? BoxShadowSize.sm;
    this.padding = padding ?? EdgeInsets.all(EdgeInsetsStep.s1);
    this.mouseCursor =
      mouseCursor ??
      SystemMouseCursor.use({ cursor: SystemMouseCursors.click });
    this.borderRadius =
      borderRadius ?? BorderRadius.all({ radius: BorderRadiusStep.sm });
    this.focusColor = focusColor ?? Colors.transparent;
    this.highlightColor = highlightColor ?? Colors.transparent;
    this.hoverColor = hoverColor ?? Colors.transparent;
  }

  static get default() {
    return new ButtonStyle({});
  }

  get css(): string {
    return "";
  }
}
