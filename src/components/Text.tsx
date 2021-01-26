import { TextStyle } from "@/abstract";
import { TextAlign } from "@/abstract/TextAlign";
import { TextOverflow } from "@/abstract/TextOverflow";
import { defineComponent, h, Ref } from "vue";

interface TextI {
  text: Ref<string | boolean | number>;
  style?: Maybe<TextStyle>;
  // strutStyle,
  textAlign?: Maybe<TextAlign>;
  // textDirection;
  // TODO: locale
  // locale,
  // softWrap;
  overflow?: Maybe<TextOverflow>;
  // maxLines;
  // textWidthBasis;
}

export const Text = ({ text, style, overflow, textAlign }: TextI) =>
  defineComponent({
    name: "Text",
    render() {
      return h(
        "div",
        {
          class: [
            style?.css ?? "",
            overflow?.css ?? "",
            textAlign?.css ?? "",
          ].join(" "),
        },
        `${text.value}`
      );
    },
  });
