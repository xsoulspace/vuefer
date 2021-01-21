export enum TextDecorations {
  none,
  underline,
  overline,
  lineThrough,
}
interface TextDecorationI {
  decoration?: TextDecorations;
}
export class TextDecoration {
  decoration: TextDecorations;
  constructor({ decoration }: TextDecorationI) {
    this.decoration = decoration ?? TextDecorations.none;
  }
  get css(): string {
    return "";
  }
}
