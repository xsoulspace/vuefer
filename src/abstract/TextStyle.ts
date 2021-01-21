import { Color } from "./Color";
import { Colors } from "./Colors";
import { TextDecoration } from "./TextDecoration";
import { TextDecorationStyle } from "./TextDecorationStyle";
interface TextStyleI {
  color?: Color;
  backgroundColor?: Color;
  decoration?: TextDecoration;
  decorationColor?: Color;
  decorationStyle?: TextDecorationStyle;
  decorationThickness?: TextDecorationThickness; // fontSize
}
export enum TextDecorationThickness {
  zero,
}

export class TextStyle {
  color: Color;
  backgroundColor: Color;
  decoration: TextDecoration;
  decorationColor: Color;
  decorationStyle: TextDecorationStyle;
  decorationThickness: TextDecorationThickness; // fontSize
  // fontWeight
  // fontStyle
  // letterSpacing
  // wordSpacing
  // textBaseline
  // height,
  // locale,
  constructor({
    color,
    backgroundColor,
    decoration,
    decorationColor,
    decorationStyle,
    decorationThickness,
  }: TextStyleI) {
    this.color = color ?? Colors.black;
    this.backgroundColor = backgroundColor ?? Colors.white;
    this.decoration = decoration ?? new TextDecoration({});
    this.decorationColor = decorationColor ?? Colors.transparent;
    this.decorationStyle = decorationStyle ?? new TextDecorationStyle({});
    this.decorationThickness =
      decorationThickness ?? TextDecorationThickness.zero;
  }
  static get default() {
    return new TextStyle({});
  }

  static apply(arg: TextStyleI) {
    return new TextStyle(arg);
  }
  // TODO: add css classes
  get css(): string {
    return "";
  }
}
