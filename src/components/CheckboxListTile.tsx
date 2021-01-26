import { Color, EdgeInsets, SystemMouseCursor } from "@/abstract";
import { Key } from "@/abstract/Key";
import { ListTileControlAffinity } from "@/abstract/ListTile";
import { Component, defineComponent, h, ref, Ref } from "vue";
import { Checkbox } from "./Checkbox";
import { ListTile } from "./ListTile";

interface CheckboxListTileI {
  title: Component;
  key?: Maybe<Key>;
  controlAffinity?: Maybe<ListTileControlAffinity>;
  onChanged: ValueChanged<boolean>;
  value: Ref<boolean>;
  contentPadding?: Maybe<EdgeInsets>;
  focusColor?: Maybe<Color>;
  hoverColor?: Maybe<Color>;
  mouseCursor?: Maybe<SystemMouseCursor>;
  selected?: Maybe<Ref<boolean>>;
  tileColor?: Maybe<Color>;
  selectedTileColor?: Maybe<Color>;
  subtitle?: Maybe<Component>;
}

export const CheckboxListTile = ({
  title,
  key,
  controlAffinity,
  contentPadding,
  onChanged,
  value,
  tileColor,
  subtitle,
  selectedTileColor,
  selected,
  mouseCursor,
  hoverColor,
  focusColor,
}: CheckboxListTileI) => {
  const handleValueChange = async () => {
    const oldValue = value.value;
    const newValue = !oldValue;
    value.value = newValue;
    await onChanged(newValue, oldValue);
  };
  const control = Checkbox({
    onChanged: onChanged,
    value: value,
  });
  let leading: Maybe<Component>, trailing: Maybe<Component>;

  switch (controlAffinity) {
    case ListTileControlAffinity.leading:
      leading = control;
      break;
    case ListTileControlAffinity.trailing:
    default:
      trailing = control;
  }
  const enabled = ref(onChanged != null);
  return defineComponent({
    name: "CheckboxListTile",
    render() {
      return h(
        ListTile({
          title,
          trailing,
          leading,
          contentPadding,
          enabled,
          focusColor,
          hoverColor,
          mouseCursor,
          onTap: handleValueChange,
          selected,
          selectedTileColor,
          subtitle,
          tileColor,
        })
      );
    },
  });
};
