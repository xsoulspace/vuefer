export enum TextAligns {
  left,
  center,
  right,
  justify,
  // start,
  // end
}
interface TextAlignI {
  textAlign?: TextAligns
}
export class TextAlign {
  textAlign: TextAligns
  constructor({ textAlign }: TextAlignI) {
    this.textAlign = textAlign ?? TextAligns.left
  }
  static get default() {
    return new TextAlign({})
  }
  get css() {
    const style = (() => {
      switch (this.textAlign) {
        case TextAligns.center:
          return 'center'
        case TextAligns.justify:
          return 'justify'

        case TextAligns.right:
          return 'right'

        case TextAligns.left:
        default:
          return 'left'
      }
    })()
    return `text-${style}`
  }
}
