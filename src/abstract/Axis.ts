enum AxisName {
  horizontal,
  vertical,
}

export class Axis {
  axis: AxisName;
  constructor({ axis }: { axis: AxisName }) {
    this.axis = axis ?? AxisName.horizontal;
  }
  static _factory(axis: AxisName) {
    return new Axis({ axis });
  }
  static get vertical() {
    return this._factory(AxisName.vertical);
  }
  static get horizontal() {
    return this._factory(AxisName.horizontal);
  }
  get css() {
    switch (this.axis) {
      case AxisName.vertical:
        return "col";
      case AxisName.horizontal:
      default:
        return "row";
    }
  }
}
