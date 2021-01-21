export enum BoxConstraintsStep {
  zero,
}
interface BoxConstraintsI {
  minWidth?: BoxConstraintsStep;
  maxWidth?: BoxConstraintsStep;
  minHeight?: BoxConstraintsStep;
  maxHeight?: BoxConstraintsStep;
}
// TODO: expand class with static methods
// as it made in Flutter
export class BoxConstraints {
  minWidth: BoxConstraintsStep;
  maxWidth: BoxConstraintsStep;
  minHeight: BoxConstraintsStep;
  maxHeight: BoxConstraintsStep;
  constructor({ maxHeight, maxWidth, minHeight, minWidth }: BoxConstraintsI) {
    this.maxHeight = maxHeight ?? BoxConstraintsStep.zero;
    this.minHeight = minHeight ?? BoxConstraintsStep.zero;
    this.maxWidth = maxWidth ?? BoxConstraintsStep.zero;
    this.minWidth = minWidth ?? BoxConstraintsStep.zero;
  }
  // TODO: add css classes
  get css(): string {
    return "";
  }
}
