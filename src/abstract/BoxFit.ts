enum BoxFitState {
  fit,
  contain,
  scaleDown,
  cover,
  none,
}
interface BoxFitI {
  boxFit?: BoxFitState;
}
export class BoxFit {
  boxFit: BoxFitState;
  constructor({ boxFit }: BoxFitI) {
    this.boxFit = boxFit ?? BoxFitState.none;
  }
  static _factory(boxFit: BoxFitState) {
    return new BoxFit({ boxFit });
  }
  static get contain() {
    return this._factory(BoxFitState.contain);
  }
  static get cover() {
    return this._factory(BoxFitState.cover);
  }
  static get fit() {
    return this._factory(BoxFitState.fit);
  }
  static get none() {
    return this._factory(BoxFitState.none);
  }
  static get scaleDown() {
    return this._factory(BoxFitState.scaleDown);
  }
  get css() {
    const fit = (() => {
      switch (this.boxFit) {
        case BoxFitState.contain:
          return "bottom";
        case BoxFitState.cover:
          return "left-bottom";
        case BoxFitState.fit:
          return "right-bottom";
        case BoxFitState.none:
        default:
          return "";
      }
    })();
    return fit.length ? `object-${fit}` : "";
  }
}
