import { Color, Colors } from '.'

export enum BorderSideWidth {
  zero,
  s1,
  s2,
  s4,
  s8,
}

export enum BorderStyle {
  none,
  solid,
  dashed,
  dotted,
  double,
}
export enum BorderSides {
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom',
}

export interface BorderSideI {
  color?: Color
  width?: BorderSideWidth
  style?: BorderStyle
}

export class BorderSide {
  color: Color
  width: BorderSideWidth
  style: BorderStyle

  constructor({ color, style, width }: BorderSideI) {
    this.color = color ?? Colors.black
    this.style = style ?? BorderStyle.solid
    this.width = width ?? BorderSideWidth.s1
  }

  static get none() {
    return new BorderSide({
      style: BorderStyle.none,
      width: BorderSideWidth.zero,
    })
  }

  widthCss({ sideName }: { sideName?: BorderSides }): string {
    const cssSideName = (() => {
      switch (sideName) {
        case BorderSides.bottom:
          return 'b'
        case BorderSides.right:
          return 'r'
        case BorderSides.left:
          return 'l'
        case BorderSides.top:
          return 't'
        default:
          return ''
      }
    })()
    const width = (() => {
      switch (this.width) {
        case BorderSideWidth.zero:
          return ''
        case BorderSideWidth.s1:
          return ''
        case BorderSideWidth.s2:
          return '2'
        case BorderSideWidth.s4:
          return '4'
        case BorderSideWidth.s8:
          return '8'
        default:
          return ''
      }
    })()

    if (this.width == BorderSideWidth.zero) return ''
    const borderSideName = `border-${cssSideName}`
    if (this.width == BorderSideWidth.s1) return borderSideName
    if (borderSideName.length <= 0) return 'border'
    return `${borderSideName}-${width}`
  }
  get colorCss(): string {
    const color = this.color.name
    return `border-${color}`
  }
  get styleCss(): string {
    const style = (() => {
      switch (this.style) {
        case BorderStyle.none:
          return ''
        case BorderStyle.dashed:
          return 'dashed'
        case BorderStyle.dotted:
          return 'dotted'
        case BorderStyle.double:
          return 'double'
        case BorderStyle.solid:
          return 'solid'
        default:
          return ''
      }
    })()
    return style.length ? `border-${style}` : ''
  }
}
