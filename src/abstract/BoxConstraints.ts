// https://tailwindcss.com/docs/min-width
export enum BoxConstraintsMaxWidth {
  zero,
  none,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  xxxl,
  xxxxl,
  xxxxxl,
  xxxxxxl,
  xxxxxxxl,
  ownSize,
  min,
  max,
}
interface BoxConstraintsI {
  minWidth?: BoxConstraintsMinWidth;
  maxWidth?: BoxConstraintsMaxWidth;
  minHeight?: BoxConstraintsStep;
  maxHeight?: BoxConstraintsStep;
}
// TODO: expand class with static methods
// as it made in Flutter
export class BoxConstraints {
  minWidth: BoxConstraintsMinWidth;
  maxWidth: BoxConstraintsMaxWidth;
  minHeight: BoxConstraintsStep;
  maxHeight: BoxConstraintsStep;
  constructor({ maxHeight, maxWidth, minHeight, minWidth }: BoxConstraintsI) {
    this.maxHeight = maxHeight ?? BoxConstraintsStep.zero;
    this.minHeight = minHeight ?? BoxConstraintsStep.zero;
    this.maxWidth = maxWidth ?? BoxConstraintsStep.zero;
    this.minWidth = minWidth ?? BoxConstraintsStep.zero;
  }
  get css(): string {
    const { minWidth, minHeight } = (() => {
      let width: string = "flex-shrink-0 ";
      switch (this.minWidth) {
        case BoxConstraintsMinWidth.zero:
          width = "flex-shrink";
          break;
        default:
          width += `min-w-${this.minWidth}`;
          break;
      }
      let height: string = width.length <= 0 ? "flex-shrink-0 " : "";
      switch (this.minHeight) {
        case BoxConstraintsStep.zero:
          height = "";
          break;
        default:
          height += `w-${this.minHeight}`;
          break;
      }
      return { minHeight: height, minWidth: width };
    })();

    const { maxHeight, maxWidth } = (() => {
      let width: string = "flex-grow-0 ";
      switch (this.maxWidth) {
        case BoxConstraintsMaxWidth.zero:
          width = "";
          break;
        default:
          width += `max-w-${this.maxWidth}`;
          break;
      }
      let height: string = width.length <= 0 ? "flex-grow-0 " : "";
      switch (this.maxHeight) {
        case BoxConstraintsStep.zero:
          height = "";
          break;
        default:
          height += `max-w-${this.maxHeight}`;
          break;
      }
      return { maxHeight: height, maxWidth: width };
    })();
    return [minHeight, minWidth, maxHeight, maxWidth].join(" ");
  }
}
