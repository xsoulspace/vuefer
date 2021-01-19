export enum BorderRadiusStep {
  zero,
  sm,
  m,
  md,
  lg,
  xl,
  xxl,
  xxxl,
  max,
}
interface BorderRadiusI {
  topLeft?: BorderRadiusStep;
  topRight?: BorderRadiusStep;
  bottomLeft?: BorderRadiusStep;
  bottomRight?: BorderRadiusStep;
}

export class BorderRadius {
  topLeft: BorderRadiusStep;
  topRight: BorderRadiusStep;
  bottomLeft: BorderRadiusStep;
  bottomRight: BorderRadiusStep;

  constructor({ bottomLeft, bottomRight, topLeft, topRight }: BorderRadiusI) {
    this.bottomLeft = bottomLeft ?? BorderRadiusStep.zero;
    this.bottomRight = bottomRight ?? BorderRadiusStep.zero;
    this.topLeft = topLeft ?? BorderRadiusStep.zero;
    this.topRight = topRight ?? BorderRadiusStep.zero;
  }
  static circular() {
    return BorderRadius.all({ radius: BorderRadiusStep.max });
  }
  static only(radiusArg: BorderRadiusI) {
    return new BorderRadius(radiusArg);
  }
  static all({ radius }: { radius: BorderRadiusStep }) {
    return BorderRadius.horizontal({
      left: radius,
      right: radius,
    });
  }
  static horizontal({
    left,
    right,
  }: {
    left?: BorderRadiusStep;
    right?: BorderRadiusStep;
  }) {
    return new BorderRadius({
      bottomLeft: left,
      bottomRight: right,
      topLeft: left,
      topRight: right,
    });
  }
  static vertical({
    top,
    bottom,
  }: {
    bottom?: BorderRadiusStep;
    top?: BorderRadiusStep;
  }) {
    return new BorderRadius({
      bottomLeft: bottom,
      bottomRight: bottom,
      topLeft: top,
      topRight: top,
    });
  }
  get css(): string {
    const corners: BorderRadiusI = {
      bottomLeft: this.bottomLeft,
      bottomRight: this.bottomRight,
      topLeft: this.topLeft,
      topRight: this.topRight,
    };
    const classes: string[] = [];
    for (const [cornerName, corner] of Object.entries(corners)) {
      const sizeClass = (() => {
        const fixedCorner = <BorderRadiusStep>corner;
        switch (fixedCorner) {
          case BorderRadiusStep.max:
            return "full";
          case BorderRadiusStep.lg:
            return "lg";
          case BorderRadiusStep.md:
            return "md";
          case BorderRadiusStep.sm:
            return "sm";
          case BorderRadiusStep.xl:
            return "xl";
          case BorderRadiusStep.xxl:
            return "2xl";
          case BorderRadiusStep.xxxl:
            return "3xl";
          case BorderRadiusStep.zero:
          default:
            return "";
        }
      })();
      const cornerClass = (() => {
        const fixedCornerName = <keyof BorderRadius>cornerName;
        switch (fixedCornerName) {
          case "bottomLeft":
            return "bl";
          case "bottomRight":
            return "br";
          case "topLeft":
            return "tl";
          case "topRight":
            return "tr";
          default:
            return "";
        }
      })();
      if (corner == BorderRadiusStep.m) {
        const fixedClassName = `rounded-${cornerClass}`;
        classes.push(fixedClassName);
      } else {
        const isClassNotEmpty = cornerClass.length > 0 || sizeClass.length > 9;
        if (isClassNotEmpty) {
          const finalClass = `rounded-${cornerClass}-${sizeClass}`;
          classes.push(finalClass);
        }
      }
    }
    if (classes.length <= 0) return "";
    return classes.join(" ");
  }
}
