export enum OpacityDecorationSteps {
  zero,
  s5,
  s10,
  s20,
  s25,
  s30,
  s40,
  s50,
  s60,
  s70,
  s75,
  s80,
  s90,
  s95,
  s100,
}

interface OpacityDecorationI {
  opacity?: OpacityDecorationSteps;
}

export class OpacityDecoration {
  opacity: OpacityDecorationSteps;
  // Use disabled param for buttons
  constructor({ opacity }: OpacityDecorationI) {
    this.opacity = opacity ?? OpacityDecorationSteps.s100;
  }
  static get default() {
    return new OpacityDecoration({});
  }
  static use(arg: OpacityDecorationI) {
    return new OpacityDecoration(arg);
  }
  get css(): string {
    const style = (() => {
      switch (this.opacity) {
        case OpacityDecorationSteps.zero:
          return "0";
        case OpacityDecorationSteps.s5:
          return "5";
        case OpacityDecorationSteps.s10:
          return "10";
        case OpacityDecorationSteps.s20:
          return "20";
        case OpacityDecorationSteps.s25:
          return "25";
        case OpacityDecorationSteps.s30:
          return "30";
        case OpacityDecorationSteps.s40:
          return "40";
        case OpacityDecorationSteps.s50:
          return "50";
        case OpacityDecorationSteps.s60:
          return "60";
        case OpacityDecorationSteps.s70:
          return "70";
        case OpacityDecorationSteps.s75:
          return "75";
        case OpacityDecorationSteps.s80:
          return "80";
        case OpacityDecorationSteps.s90:
          return "90";
        case OpacityDecorationSteps.s95:
          return "95";
        case OpacityDecorationSteps.s100:
        default:
          return "100";
      }
    })();
    const opacityStyle = `opacity-${style}`;
    return opacityStyle;
  }
}
