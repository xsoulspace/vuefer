enum MainAxisAlignmentName {
  start,
  end,
  center,
  spaceBetween,
  spaceAround,
  spaceEvenly,
}

export class MainAxisAlignment {
  alignment: MainAxisAlignmentName
  constructor({ alignment }: { alignment: MainAxisAlignmentName }) {
    this.alignment = alignment ?? MainAxisAlignmentName.start
  }
  static _factory(alignment: MainAxisAlignmentName) {
    return new MainAxisAlignment({ alignment })
  }
  static get start() {
    return this._factory(MainAxisAlignmentName.start)
  }
  static get end() {
    return this._factory(MainAxisAlignmentName.end)
  }
  static get center() {
    return this._factory(MainAxisAlignmentName.center)
  }
  static get spaceAround() {
    return this._factory(MainAxisAlignmentName.spaceAround)
  }
  static get spaceBetween() {
    return this._factory(MainAxisAlignmentName.spaceBetween)
  }
  static get spaceEvenly() {
    return this._factory(MainAxisAlignmentName.spaceEvenly)
  }
  get css() {
    const alignment = (() => {
      switch (this.alignment) {
        case MainAxisAlignmentName.start:
          return 'start'
        case MainAxisAlignmentName.end:
          return 'end'
        case MainAxisAlignmentName.center:
          return 'center'
        case MainAxisAlignmentName.spaceAround:
          return 'around'
        case MainAxisAlignmentName.spaceBetween:
          return 'between'
        case MainAxisAlignmentName.spaceEvenly:
          return 'evenly'
        default:
          return 'start'
      }
    })()
    return `justify-${alignment}`
  }
}
