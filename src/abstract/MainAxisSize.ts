enum MainAxisSizeName {
  max,
  min,
}

export class MainAxisSize {
  size: MainAxisSizeName;
  constructor({ size }: { size: MainAxisSizeName }) {
    this.size = size ?? MainAxisSizeName.min;
  }
  static _factory(size: MainAxisSizeName) {
    return new MainAxisSize({ size });
  }
  static get max() {
    return this._factory(MainAxisSizeName.max);
  }
  static get min() {
    return this._factory(MainAxisSizeName.min);
  }
  get css() {
    switch (this.size) {
      case MainAxisSizeName.max:
        return "flex-grow";
      case MainAxisSizeName.min:
      default:
        return "flex-grow-0";
    }
  }
}
