export enum TextDecorations {
  none,
  underline,
  // overline,
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
    switch (this.decoration) {
      case TextDecorations.lineThrough:
        return "line-through";
      case TextDecorations.underline:
        return "underline";
      case TextDecorations.none:
      default:
        return "no-underline";
    }
  }
}
