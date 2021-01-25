enum CrossAxisAlignmentName {
  start,
  end,
  center,
  baseline,
  stretch,
}

export class CrossAxisAlignment {
  alignment: CrossAxisAlignmentName;
  constructor({ alignment }: { alignment: CrossAxisAlignmentName }) {
    this.alignment = alignment ?? CrossAxisAlignmentName.start;
  }
  static _factory(alignment: CrossAxisAlignmentName) {
    return new CrossAxisAlignment({ alignment });
  }
  static get start() {
    return this._factory(CrossAxisAlignmentName.start);
  }
  static get end() {
    return this._factory(CrossAxisAlignmentName.end);
  }
  static get center() {
    return this._factory(CrossAxisAlignmentName.center);
  }
  static get baseline() {
    return this._factory(CrossAxisAlignmentName.baseline);
  }
  static get stretch() {
    return this._factory(CrossAxisAlignmentName.stretch);
  }
  get css() {
    const alignment = (() => {
      switch (this.alignment) {
        case CrossAxisAlignmentName.start:
          return "start";
        case CrossAxisAlignmentName.end:
          return "end";
        case CrossAxisAlignmentName.center:
          return "center";
        case CrossAxisAlignmentName.baseline:
          return "baseline";
        case CrossAxisAlignmentName.stretch:
          return "stretch";
        default:
          return "start";
      }
    })();
    return `content-${alignment}`;
  }
}
