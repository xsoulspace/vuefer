import { BorderRadius, BorderRadiusStep } from './BorderRadius'
import { BoxBorder } from './BoxBorder'
import { BoxShadow } from './BoxShadow'
import { Color } from './Color'
import { Colors } from './Colors'
import { EdgeInsets, EdgeInsetsStep } from './EdgeInsets'
import { SystemMouseCursor, SystemMouseCursors } from './MouseCursor'
import { TextStyle } from './TextStyle'

interface ButtonStyleI {
  textStyle?: TextStyle
  backgroundColor?: Color
  elevation?: BoxShadow
  padding?: EdgeInsets
  mouseCursor?: SystemMouseCursor
  borderRadius?: BorderRadius

  focusColor?: Color
  highlightColor?: Color
  hoverColor?: Color
  // shadowColor?: Color;
  // overlayColor?: Color;
  // foregroundColor?: Color;
  // minimumSize?:
  boxBorder?: BoxBorder
  // shape: OutlinedBorder
  // animationDuration?: Duration
}

export class ButtonStyle {
  textStyle: TextStyle
  backgroundColor: Color
  // foregroundColor: Color;
  // overlayColor: Color;
  // shadowColor: Color;
  elevation: BoxShadow
  padding: EdgeInsets
  mouseCursor: SystemMouseCursor
  borderRadius: BorderRadius
  focusColor: Color
  highlightColor: Color
  hoverColor: Color
  // minimumSize?: ?>
  boxBorder: BoxBorder
  // shape: OutlinedBorder?>
  // animationDuration?: Duration
  constructor({
    backgroundColor,
    elevation,
    // foregroundColor,
    mouseCursor,
    // overlayColor,
    padding,
    // shadowColor,
    borderRadius,
    focusColor,
    highlightColor,
    hoverColor,
    textStyle,
    boxBorder,
  }: ButtonStyleI) {
    this.textStyle = textStyle ?? TextStyle.default
    this.backgroundColor = backgroundColor ?? Colors.transparent
    // this.foregroundColor = foregroundColor ?? Colors.black;
    // this.overlayColor = overlayColor ?? Colors.transparent;
    // this.shadowColor = shadowColor ?? Colors.transparent;
    this.elevation = elevation ?? BoxShadow.m
    this.padding = padding ?? EdgeInsets.all(EdgeInsetsStep['s2.5'])
    this.mouseCursor =
      mouseCursor ?? SystemMouseCursor.use({ cursor: SystemMouseCursors.click })
    this.boxBorder = boxBorder ?? BoxBorder.default
    this.borderRadius =
      borderRadius ?? BorderRadius.all({ radius: BorderRadiusStep.m })
    this.focusColor = focusColor ?? Colors.black
    this.highlightColor = highlightColor ?? Colors.black
    this.hoverColor = hoverColor ?? Colors.indigo
  }

  static get default() {
    return new ButtonStyle({})
  }
  get css(): string {
    console.log({ b: this.boxBorder })
    return [
      this.textStyle.css,
      this.backgroundColor.backgroundCss,
      this.elevation.css,
      this.padding.paddingCss,
      this.mouseCursor.css,
      this.borderRadius.css,
      this.hoverColor.hoverBackgroundCss,
      this.focusColor.focusCss,
      this.highlightColor.highlightCss,
      this.boxBorder.css,
    ].join(' ')
  }
}
