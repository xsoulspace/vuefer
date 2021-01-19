enum AlignmentEdge {
  top,
  topLeft,
  topCenter,
  topRight,
  left,
  centerLeft,
  center,
  centerRight,
  right,
  bottomLeft,
  bottomCenter,
  bottomRight,
  bottom,
}
interface AlignmentI {
  alignment?: AlignmentEdge;
}
// export class AlignmentHelper {
//   static getClassNames({ alignment, heightFactor, widthFactor }: AlignI) {
//     return [alignment.css];
//   }
// }

export class Alignment {
  alignment: AlignmentEdge;
  constructor({ alignment }: AlignmentI) {
    this.alignment = alignment ?? AlignmentEdge.topLeft;
  }
  static _factory(alignment: AlignmentEdge) {
    return new Alignment({ alignment });
  }
  static get top() {
    return this._factory(AlignmentEdge.top);
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
  static get left() {
    return this._factory(AlignmentEdge.left);
  }
  static get right() {
    return this._factory(AlignmentEdge.right);
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
  static get bottom() {
    return this._factory(AlignmentEdge.bottom);
  }
  get css() {
    const edge = (() => {
      switch (this.alignment) {
        case AlignmentEdge.bottom:
          return "inset-x-0 bottom-0 ";
        case AlignmentEdge.bottomCenter:
          return "inset-x-1/4 bottom-0 flex justify-center items-center content-center";
        case AlignmentEdge.bottomLeft:
          return "bottom-0 left-0";
        case AlignmentEdge.bottomRight:
          return "bottom-0 right-0";
        case AlignmentEdge.right:
          return "inset-y-0 right-0";
        case AlignmentEdge.left:
          return "inset-y-0 left-0";
        case AlignmentEdge.center:
          return "flex items-center content-center justify-center inset-1/4";
        case AlignmentEdge.centerLeft:
          return "inset-y-1/4";
        case AlignmentEdge.centerRight:
          return "inset-y-1/4 right-0";
        case AlignmentEdge.topCenter:
          return "inset-x-1/4 top-0 flex justify-center items-center content-center";
        case AlignmentEdge.topRight:
          return "top-0 right-0";
        case AlignmentEdge.top:
          return "inset-x-0 top-0";
        case AlignmentEdge.topLeft:
          return "left-0 top-0";
        default:
          return "left-0 top-0";
      }
    })();
    return `absolute ${edge}`;
  }
}
