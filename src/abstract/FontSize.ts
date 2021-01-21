export enum FontSizes {
  xs,
  sm,
  m,
  lg,
  xl,
  xxl,
  xxxl,
  xxxxl,
  xxxxxl,
  xxxxxxl,
  xxxxxxxl,
  xxxxxxxxl,
  xxxxxxxxxl,
}
interface FontSizeI {
  fontSize?: FontSizes;
}
export class FontSize {
  fontSize: FontSizes;
  constructor({ fontSize }: FontSizeI) {
    this.fontSize = fontSize ?? FontSizes.m;
  }
  static get default() {
    return new FontSize({});
  }
  get css() {
    const style = (() => {
      switch (this.fontSize) {
        case FontSizes.lg:
          return "lg";
        case FontSizes.sm:
          return "sm";
        case FontSizes.xs:
          return "xs";
        case FontSizes.xl:
          return "xl";
        case FontSizes.xxl:
          return "2xl";
        case FontSizes.xxxl:
          return "3xl";
        case FontSizes.xxxxl:
          return "4xl";
        case FontSizes.xxxxxl:
          return "5xl";
        case FontSizes.xxxxxxl:
          return "6xl";
        case FontSizes.xxxxxxxl:
          return "7xl";
        case FontSizes.xxxxxxxxl:
          return "8xl";
        case FontSizes.xxxxxxxxxl:
          return "9xl";

        case FontSizes.m:
        default:
          return "base";
      }
    })();
    return `text-${style}`;
  }
}
