import { HTMLAttributes } from "vue";

// TODO: add other types of text input
export enum TextInputTypes {
  text = "text",
  // multiline = "multiline",
  number = "number",
  phone = "tel",
  datetime = "date",
  emailAddress = "email",
  url = "url",
  color = "color",
  // visiblePassword = "visiblePassword",
  // name = "name",
  // address = "address",
}

interface TextInputTypeI {
  textInputType?: TextInputTypes;
}

export class TextInputType {
  textInputType: TextInputTypes;

  constructor({ textInputType }: TextInputTypeI) {
    this.textInputType = textInputType ?? TextInputTypes.text;
  }
  get htmlInputMode(): HTMLAttributes["inputmode"] {
    switch (this.textInputType) {
      case TextInputTypes.url:
        return "url";
      case TextInputTypes.phone:
        return "tel";
      case TextInputTypes.number:
        return "numeric";
      case TextInputTypes.emailAddress:
        return "email";
      case TextInputTypes.datetime:
        return "none";
      case TextInputTypes.color:
        return "none";
      case TextInputTypes.text:
      default:
        return "text";
    }
  }
  static get default() {
    return new TextInputType({});
  }
}
