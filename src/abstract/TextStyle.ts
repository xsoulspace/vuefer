import {
  Color,
  Colors,
  FontSize,
  FontWeight,
  TextDecoration,
  TextDecorationStyle,
} from '.'
interface TextStyleI {
  color?: Color
  backgroundColor?: Color
  decoration?: TextDecoration
  // decorationColor?: Color;
  decorationStyle?: TextDecorationStyle
  fontWeight?: FontWeight
  fontSize?: FontSize
}

export class TextStyle {
  color: Color
  backgroundColor: Color
  decoration: TextDecoration
  // decorationColor: Color;
  decorationStyle: TextDecorationStyle
  // decorationThickness: TextDecorationThickness;
  fontSize: FontSize
  fontWeight: FontWeight
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
    decorationStyle,
    fontWeight,
    fontSize,
  }: TextStyleI) {
    this.color = color ?? Colors.black
    this.backgroundColor = backgroundColor ?? Colors.transparent
    this.decoration = decoration ?? new TextDecoration({})
    // this.decorationColor = decorationColor ?? Colors.transparent;
    this.decorationStyle = decorationStyle ?? new TextDecorationStyle({})
    this.fontWeight = fontWeight ?? FontWeight.default
    this.fontSize = fontSize ?? FontSize.default
  }
  static get default() {
    return new TextStyle({})
  }

  static apply(arg: TextStyleI) {
    return new TextStyle(arg)
  }
  get css(): string {
    return [
      this.backgroundColor.backgroundCss,
      this.color.textCss,
      this.decoration.css,
      this.decorationStyle.css,
      this.fontWeight.css,
      this.fontSize.css,
    ].join(' ')
  }
}
