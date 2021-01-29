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
  alignment?: AlignmentEdge
  toOverlay?: boolean
}
// export class AlignmentHelper {
//   static getClassNames({ alignment, heightFactor, widthFactor }: AlignI) {
//     return [alignment.css];
//   }
// }

export class Alignment {
  alignment: AlignmentEdge
  toOverlay: boolean
  constructor({ alignment, toOverlay }: AlignmentI) {
    this.alignment = alignment ?? AlignmentEdge.topLeft
    this.toOverlay = toOverlay ?? false
  }
  static _factory(alignment: AlignmentEdge) {
    return new Alignment({ alignment })
  }
  static get top() {
    return this._factory(AlignmentEdge.top)
  }
  static get topLeft() {
    return this._factory(AlignmentEdge.topLeft)
  }
  static get topCenter() {
    return this._factory(AlignmentEdge.topCenter)
  }
  static get topRight() {
    return this._factory(AlignmentEdge.topRight)
  }
  static get left() {
    return this._factory(AlignmentEdge.left)
  }
  static get right() {
    return this._factory(AlignmentEdge.right)
  }
  static get centerLeft() {
    return this._factory(AlignmentEdge.centerLeft)
  }
  static get center() {
    return this._factory(AlignmentEdge.center)
  }
  static get centerRight() {
    return this._factory(AlignmentEdge.centerRight)
  }
  static get bottomLeft() {
    return this._factory(AlignmentEdge.bottomLeft)
  }
  static get bottomCenter() {
    return this._factory(AlignmentEdge.bottomCenter)
  }
  static get bottomRight() {
    return this._factory(AlignmentEdge.bottomRight)
  }
  static get bottom() {
    return this._factory(AlignmentEdge.bottom)
  }
  get css() {
    const relativeAlignment: string = (() => {
      switch (this.alignment) {
        case AlignmentEdge.bottomCenter:
        case AlignmentEdge.bottom:
          return 'flex flex-grow flex-row place-content-center items-center content-center justify-center justify-items-center'
        case AlignmentEdge.center:
          return 'flex flex-grow  flex-row place-content-center items-center content-center justify-center justify-items-center'
        case AlignmentEdge.topCenter:
        case AlignmentEdge.top:
          return 'flex flex-grow flex-row place-content-center items-center content-center justify-center justify-items-center'
        case AlignmentEdge.topRight:
        case AlignmentEdge.centerRight:
        case AlignmentEdge.bottomRight:
        case AlignmentEdge.right:
          return 'flex flex-grow flex-row place-content-end items-end content-end justify-end justify-items-end'
        case AlignmentEdge.topLeft:
        case AlignmentEdge.centerLeft:
        case AlignmentEdge.bottomLeft:
        case AlignmentEdge.left:
          return 'flex flex-grow flex-row place-content-start items-start content-start justify-start justify-items-start'
        default:
          return ''
      }
    })()
    const edge = (() => {
      switch (this.alignment) {
        case AlignmentEdge.bottom:
          return 'inset-x-0 bottom-0 '
        case AlignmentEdge.bottomCenter:
          return 'inset-x-1/4 bottom-0'
        case AlignmentEdge.bottomLeft:
          return 'bottom-0 left-0'
        case AlignmentEdge.bottomRight:
          return 'bottom-0 right-0'
        case AlignmentEdge.right:
          return 'inset-y-0 right-0'
        case AlignmentEdge.left:
          return 'inset-y-0 left-0'
        case AlignmentEdge.center:
          return 'top-0 left-0 right-0 bottom-0'
        case AlignmentEdge.centerLeft:
          return 'inset-y-1/4'
        case AlignmentEdge.centerRight:
          return 'inset-y-1/4 right-0'
        case AlignmentEdge.topCenter:
          return 'inset-x-1/4 top-0 '
        case AlignmentEdge.topRight:
          return 'top-0 right-0'
        case AlignmentEdge.top:
          return 'inset-x-0 top-0'
        case AlignmentEdge.topLeft:
          return 'left-0 top-0'
        default:
          return 'left-0 top-0'
      }
    })()
    return [this.toOverlay ? 'absolute ' + edge : '', relativeAlignment].join(
      ' '
    )
  }
}
