import { EdgeInsetsStep } from ".";

enum SizeStep {
  max = "full",
  min = "min",
  auto = "auto",
  screen = "screen",
}

interface SizedBoxHeightI {
  height?: EdgeInsetsStep;
}

export class SizedBoxHeight {
  height: EdgeInsetsStep | SizeStep;
  constructor({ height }: SizedBoxHeightI) {
    this.height = height ?? SizeStep.auto;
  }
  static get default() {
    return new SizedBoxHeight({});
  }

  get css(): string {
    return `h-${this.height}`;
  }
}
interface SizedBoxWidthI {
  width?: EdgeInsetsStep;
}
export class SizedBoxWidth {
  width: EdgeInsetsStep | SizeStep;
  constructor({ width }: SizedBoxWidthI) {
    this.width = width ?? SizeStep.auto;
  }
  static get default() {
    return new SizedBoxWidth({});
  }
  get css(): string {
    return `w-${this.width}`;
  }
}
