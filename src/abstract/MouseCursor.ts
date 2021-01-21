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
    const type = (() => {
      switch (this.cursor) {
        case SystemMouseCursors.basic:
          return "default";
        case SystemMouseCursors.click:
          return "pointer";
        case SystemMouseCursors.copy:
        case SystemMouseCursors.forbidden:
          return "not-allowed";
        case SystemMouseCursors.none:
        case SystemMouseCursors.progress:
        case SystemMouseCursors.text:
          return "text";
        case SystemMouseCursors.wait:
          return "wait";

        default:
          return "auto";
      }
    })();
    return `cursor-${type}`;
  }
}
