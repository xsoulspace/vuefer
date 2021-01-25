import { Ref } from "vue";
import { BorderSide } from "./BorderSide";
import { BoxBorder } from "./BoxBorder";
import { Color } from "./Color";
import { Colors } from "./Colors";
import { EdgeInsets, EdgeInsetsStep } from "./EdgeInsets";
interface InputDecorationI {
  labelText?: Maybe<Ref<string>>;
  // icon?:
  border?: Maybe<BoxBorder>;
  contentPadding?: Maybe<EdgeInsets>;
  focusColor?: Maybe<Color>;
  hoverColor?: Maybe<Color>;
}
(" text-indigo-700 border-b-2 border-indigo-500  focus:bg-gray-300");
// TODO: input decoartion
export class InputDecoration {
  labelText?: Maybe<Ref<string>>;
  // icon?:
  border: BoxBorder;
  contentPadding: EdgeInsets;
  focusColor: Color;
  hoverColor: Color;
  // labelStyle
  // helperText
  // helperStyle
  // helperMaxLines
  // hintText
  // hintStyle
  // hintMaxLines
  // errorText
  // errorStyle
  // errorMaxLines
  // floatingLabelBehavior
  // isCollapsed = false
  // isDense
  // prefixIcon
  // prefixIconConstraints
  // prefix
  // prefixText
  // prefixStyle
  // suffixIcon
  // suffix
  // suffixText
  // suffixStyle
  // suffixIconConstraints
  // counter
  // counterText
  // counterStyle
  // filled
  // fillColor
  // errorBorder
  // focusedBorder
  // focusedErrorBorder
  // disabledBorder
  // enabledBorder
  // enabled = true
  // semanticCounterText
  // alignLabelWithHint
  constructor({
    border,
    labelText,
    contentPadding,
    hoverColor,
    focusColor,
  }: InputDecorationI) {
    this.border =
      border ??
      new BoxBorder({
        bottom: new BorderSide({
          color: Colors.grey,
        }),
      });
    this.labelText = labelText;
    this.focusColor = focusColor ?? Colors.grey;
    this.hoverColor = hoverColor ?? Colors.indigo;
    this.contentPadding = contentPadding ?? EdgeInsets.all(EdgeInsetsStep.s2);
  }
  static get default(): InputDecoration {
    return new InputDecoration({});
  }
  get css() {
    return [
      this.border.css,
      this.contentPadding.paddingCss,
      this.focusColor.focusCss,
      this.hoverColor.hoverBackgroundCss,
    ].join(" ");
  }
}
