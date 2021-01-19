export enum DividerThicknessStep {
  zero = "zero",
  "s2" = 2,
  "s4" = 4,
  "s8" = 8,
}

export class DividerThickness {
  thickness?: DividerThicknessStep;
  constructor({
    // endIndent,
    thickness,
  }: {
    // endIndent: DividerThicknessStep;
    thickness: DividerThicknessStep;
  }) {
    this.thickness = thickness;
  }
  get css() {
    switch (this.thickness) {
      case DividerThicknessStep.s2:
        return "-2";
      case DividerThicknessStep.s4:
        return "-4";
      case DividerThicknessStep.s8:
        return "-8";
      case DividerThicknessStep.zero:
        return "-0";
      default:
        return "";
    }
  }
}
