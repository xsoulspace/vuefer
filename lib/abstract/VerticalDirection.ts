enum VerticalDirectionName {
  up,
  down,
}

export class VerticalDirection {
  direction: VerticalDirectionName
  constructor({ direction }: { direction: VerticalDirectionName }) {
    this.direction = direction ?? VerticalDirectionName.down
  }
  static _factory(direction: VerticalDirectionName) {
    return new VerticalDirection({ direction })
  }
  static get up() {
    return this._factory(VerticalDirectionName.up)
  }
  static get down() {
    return this._factory(VerticalDirectionName.down)
  }
  get css() {
    switch (this.direction) {
      case VerticalDirectionName.up:
        return '-reverse'
      case VerticalDirectionName.down:
      default:
        return ''
    }
  }
}
