import { EdgeInsetsStep } from "./EdgeInsets";

// https://tailwindcss.com/docs/min-width
export enum BoxConstraintsMaxWidth {
  zero,
  none = "none",
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  xxl = "2xl",
  xxxl = "3xl",
  xxxxl = "4xl",
  xxxxxl = "5xl",
  xxxxxxl = "6xl",
  xxxxxxxl = "7xl",
  ownSize = "max",
  min = "min",
  max = "full",
}
export enum BoxConstraintsMinWidth {
  zero,
  ownSize = "max",
  min = "min",
  max = "full",
}
export enum BoxConstraintsMinHeight {
  zero,
  max = "full",
  screen = "screen",
}
export enum BoxConstraintsMaxHeight {
  zero,
  max = "full",
  screen = "screen",
}

interface BoxConstraintsI {
  minWidth?: BoxConstraintsMinWidth;
  maxWidth?: BoxConstraintsMaxWidth;
  minHeight?: BoxConstraintsMinHeight;
  maxHeight?: BoxConstraintsMaxHeight | EdgeInsetsStep;
}
// TODO: expand class with static methods
// as it made in Flutter
export class BoxConstraints {
  minWidth: BoxConstraintsMinWidth;
  maxWidth: BoxConstraintsMaxWidth;
  minHeight: BoxConstraintsMinHeight;
  maxHeight: BoxConstraintsMaxHeight | EdgeInsetsStep;
  constructor({ maxHeight, maxWidth, minHeight, minWidth }: BoxConstraintsI) {
    this.maxHeight = maxHeight ?? BoxConstraintsMaxHeight.zero;
    this.minHeight = minHeight ?? BoxConstraintsMinHeight.zero;
    this.maxWidth = maxWidth ?? BoxConstraintsMaxWidth.zero;
    this.minWidth = minWidth ?? BoxConstraintsMinWidth.zero;
  }
  get css(): string {
    const { minWidth, minHeight } = (() => {
      let width = "flex-shrink ";
      switch (this.minWidth) {
        case BoxConstraintsMinWidth.zero:
          width = "";
          break;
        default:
          width += `min-w-${this.minWidth}`;
          break;
      }
      const isWidthZero = this.minWidth == BoxConstraintsMinWidth.zero;
      let height: string = isWidthZero ? "flex-shrink " : "";
      switch (this.minHeight) {
        case BoxConstraintsMinHeight.zero:
          height = "";
          break;
        default:
          height += `min-h-${this.minHeight}`;
          break;
      }
      return { minHeight: height, minWidth: width };
    })();

    const { maxHeight, maxWidth } = (() => {
      let width = "flex-grow ";
      switch (this.maxWidth) {
        case BoxConstraintsMaxWidth.zero:
          width = "";
          break;
        default:
          width += `max-w-${this.maxWidth}`;
          break;
      }
      const isWidthZero = this.maxWidth == BoxConstraintsMaxWidth.zero;

      let height: string = isWidthZero ? "flex-grow " : "";
      switch (this.maxHeight) {
        case BoxConstraintsMaxHeight.zero:
          height = "";
          break;
        default:
          height += `max-h-${this.maxHeight}`;
          break;
      }
      return { maxHeight: height, maxWidth: width };
    })();
    return [minHeight, minWidth, maxHeight, maxWidth].join(" ");
  }
}
