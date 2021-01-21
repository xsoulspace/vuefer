export enum TextDecorationStyles {
  solid,
  double,
  dotted,
  dashed,
}
interface TextDecorationStyleI {
  decorationStyle?: TextDecorationStyles;
}
export class TextDecorationStyle {
  decorationStyle: TextDecorationStyles;
  constructor({ decorationStyle }: TextDecorationStyleI) {
    this.decorationStyle = decorationStyle ?? TextDecorationStyles.solid;
  }

  get css(): string {
    return "";
  }
}
