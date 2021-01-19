export enum BoxShadowSize {
  sm,
  md,
  m,
  lg,
  xl,
  xxl,
  none,
}
// TODO: make it more customizable
export class BoxShadow {
  size?: BoxShadowSize;
  constructor({ size }: { size: BoxShadowSize }) {
    this.size = size;
  }
  static _factory(size: BoxShadowSize) {
    return new BoxShadow({ size });
  }
  static get sm() {
    return this._factory(BoxShadowSize.sm);
  }
  static get md() {
    return this._factory(BoxShadowSize.md);
  }
  static get m() {
    return this._factory(BoxShadowSize.m);
  }
  static get lg() {
    return this._factory(BoxShadowSize.lg);
  }
  static get xl() {
    return this._factory(BoxShadowSize.xl);
  }
  static get xxl() {
    return this._factory(BoxShadowSize.xxl);
  }

  static get none() {
    return this._factory(BoxShadowSize.none);
  }
  get css(): string {
    if (this.size == BoxShadowSize.none) return "";
    const size = (() => {
      switch (this.size) {
        case BoxShadowSize.lg:
          return "-lg";
        case BoxShadowSize.m:
          return "";
        case BoxShadowSize.md:
          return "-md";
        case BoxShadowSize.sm:
          return "-sm";
        case BoxShadowSize.xl:
          return "-xl";
        case BoxShadowSize.xxl:
          return "-2xl";
        default:
          return "";
      }
    })();
    return `shadow${size}`;
  }
}
