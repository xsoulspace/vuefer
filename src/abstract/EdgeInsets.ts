export enum EdgeInsetsStep {
  "px" = "px",
  "s0" = 0,
  "s0.5" = 0.5,
  "s1" = 1,
  "s1.5" = 1.5,
  "s2" = 2.5,
  "s2.5" = 2.5,
  "s3" = 3,
  "s3.5" = 3.5,
  "s4" = 4,
  "s5" = 5,
  "s6" = 6,
  "s7" = 7,
  "s8" = 8,
  "s9" = 9,
  "s10" = 10,
  "s11" = 11,
  "s12" = 12,
  "s14" = 14,
  "s16" = 16,
  "s20" = 20,
  "s24" = 24,
  "s28" = 28,
  "s32" = 32,
  "s36" = 36,
  "s40" = 40,
  "s44" = 44,
  "s48" = 48,
  "s52" = 52,
  "s56" = 56,
  "s60" = 60,
  "s64" = 64,
  "s72" = 72,
  "s80" = 80,
  "s96" = 96,
}

interface ltrb {
  left?: EdgeInsetsStep;
  top?: EdgeInsetsStep;
  right?: EdgeInsetsStep;
  bottom?: EdgeInsetsStep;
}

export class EdgeInsets {
  left: EdgeInsetsStep;
  top: EdgeInsetsStep;
  right: EdgeInsetsStep;
  bottom: EdgeInsetsStep;
  constructor({ left, top, right, bottom }: ltrb) {
    this.left = left ?? EdgeInsetsStep.s0;
    this.top = top ?? EdgeInsetsStep.s0;
    this.right = right ?? EdgeInsetsStep.s0;
    this.bottom = bottom ?? EdgeInsetsStep.s0;
  }
  static symmetric({
    vertical,
    horizontal,
  }: {
    vertical?: EdgeInsetsStep;
    horizontal?: EdgeInsetsStep;
  }) {
    const left = horizontal,
      right = horizontal,
      top = vertical,
      bottom = vertical;
    return new EdgeInsets({ bottom, right, left, top });
  }
  static only(ltrb: ltrb) {
    return new EdgeInsets(ltrb);
  }
  static all(value: EdgeInsetsStep) {
    return new EdgeInsets({
      bottom: value,
      left: value,
      right: value,
      top: value,
    });
  }

  get paddingCss(): string {
    return (
      `pl-${this.left} pt-${this.top} ` + `pr-${this.right} pb-${this.bottom}`
    );
  }
  get marginCss(): string {
    return (
      `ml-${this.left} mt-${this.top} ` + `mr-${this.right} mb-${this.bottom}`
    );
  }
}
