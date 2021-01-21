export enum FontWeights {
  thin,
  extralight,
  light,
  normal,
  medium,
  semibold,
  bold,
  extrabold,
  extraextrabold,
}
interface FontWeightI {
  fontWeight?: FontWeights;
}
export class FontWeight {
  fontWeight: FontWeights;
  constructor({ fontWeight }: FontWeightI) {
    this.fontWeight = fontWeight ?? FontWeights.normal;
  }
  static get default() {
    return new FontWeight({});
  }
  get css() {
    const style = (() => {
      switch (this.fontWeight) {
        case FontWeights.bold:
          return "bold";
        case FontWeights.extrabold:
          return "extrabold";

        case FontWeights.extraextrabold:
          return "black";

        case FontWeights.extralight:
          return "extralight";

        case FontWeights.light:
          return "light";

        case FontWeights.medium:
          return "medium";

        case FontWeights.semibold:
          return "semibold";

        case FontWeights.thin:
          return "thin";

        case FontWeights.normal:
        default:
          return "normal";
      }
    })();
    return `font-${style}`;
  }
}
