enum AlignmentEdge {
  topLeft,
  topCenter,
  topRight,
  centerLeft,
  center,
  centerRight,
  bottomLeft,
  bottomCenter,
  bottomRight,
}
interface AlignmentI {
  alignment?: AlignmentEdge;
}
export class Alignment {
  alignment?: AlignmentEdge;
  constructor({ alignment }: AlignmentI) {
    this.alignment = alignment;
  }
  static _factory(alignment: AlignmentEdge) {
    return new Alignment({ alignment });
  }
  static get topLeft() {
    return this._factory(AlignmentEdge.topLeft);
  }
  static get topCenter() {
    return this._factory(AlignmentEdge.topCenter);
  }
  static get topRight() {
    return this._factory(AlignmentEdge.topRight);
  }
  static get centerLeft() {
    return this._factory(AlignmentEdge.centerLeft);
  }
  static get center() {
    return this._factory(AlignmentEdge.center);
  }
  static get centerRight() {
    return this._factory(AlignmentEdge.centerRight);
  }
  static get bottomLeft() {
    return this._factory(AlignmentEdge.bottomLeft);
  }
  static get bottomCenter() {
    return this._factory(AlignmentEdge.bottomCenter);
  }
  static get bottomRight() {
    return this._factory(AlignmentEdge.bottomRight);
  }
  get css() {
    const edge = (() => {
      switch (this.alignment) {
        case AlignmentEdge.bottomCenter:
          return "bottom";
        case AlignmentEdge.bottomLeft:
          return "left-bottom";
        case AlignmentEdge.bottomRight:
          return "right-bottom";
        case AlignmentEdge.center:
          return "center";
        case AlignmentEdge.centerLeft:
          return "left";
        case AlignmentEdge.centerRight:
          return "right";
        case AlignmentEdge.topCenter:
          return "top";
        case AlignmentEdge.topLeft:
          return "left-top";
        case AlignmentEdge.topRight:
          return "right-top";
        default:
          return "left";
      }
    })();
    return `object-${edge}`;
  }
}
