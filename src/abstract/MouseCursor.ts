export enum SystemMouseCursors {
  none,
  basic,
  click,
  forbidden,
  wait,
  progress,
  text,
  copy,
}
interface SystemMouseCursorI {
  cursor?: SystemMouseCursors;
}

export class SystemMouseCursor {
  cursor: SystemMouseCursors;

  constructor({ cursor }: SystemMouseCursorI) {
    this.cursor = cursor ?? SystemMouseCursors.basic;
  }
  static use(arg: SystemMouseCursorI) {
    return new SystemMouseCursor(arg);
  }
  // TODO: add css classes
  get css(): string {
    return "";
  }
}
