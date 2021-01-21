export enum TextOverflows {
  clip,
  fade,
  ellipsis,
  visible,
}
interface TextOverflowI {
  textOverflow?: TextOverflows;
}
export class TextOverflow {
  textOverflow: TextOverflows;
  constructor({ textOverflow }: TextOverflowI) {
    this.textOverflow = textOverflow ?? TextOverflows.visible;
  }
  static get default() {
    return new TextOverflow({});
  }
  get css() {
    switch (this.textOverflow) {
      case TextOverflows.clip:
        return "center";
      case TextOverflows.ellipsis:
        return "justify";

      case TextOverflows.fade:
        return "truncate";

      case TextOverflows.visible:
      default:
        return "";
    }
  }
}
