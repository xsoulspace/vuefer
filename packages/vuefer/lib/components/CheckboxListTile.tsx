import { Component, defineComponent, h, ref, Ref } from 'vue'
import { Maybe, ValueChanged } from '../abstract/BasicTypes'
import { Color } from '../abstract/Color'
import { EdgeInsets } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'
import { ListTileControlAffinity } from '../abstract/ListTile'
import { SystemMouseCursors } from '../abstract/MouseCursor'
import { Checkbox } from './Checkbox'
import { ListTile } from './ListTile'
interface CheckboxListTileI {
  title: Component
  key?: Maybe<Key>
  controlAffinity?: Maybe<ListTileControlAffinity>
  onChanged?: Maybe<ValueChanged<boolean>>
  onTap?: Maybe<CallableFunction>
  value: Ref<boolean>
  contentPadding?: Maybe<EdgeInsets>
  focusColor?: Maybe<Color>
  hoverColor?: Maybe<Color>
  mouseCursor?: Maybe<SystemMouseCursors>
  selected?: Maybe<Ref<boolean>>
  tileColor?: Maybe<Color>
  selectedTileColor?: Maybe<Color>
  subtitle?: Maybe<Component>
  enabled?: Maybe<Ref<boolean>>
  _debugClasses?: Maybe<string>
}

export const CheckboxListTile = ({
  title,
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
  onTap,
  enabled,
  _debugClasses,
}: CheckboxListTileI) => {
  const control = Checkbox({
    onChanged,
    value,
  })
  let leading: Maybe<Component>, trailing: Maybe<Component>

  switch (controlAffinity) {
    case ListTileControlAffinity.leading:
      leading = control
      break
    case ListTileControlAffinity.trailing:
    default:
      trailing = control
  }
  const resolvedEnabled = enabled ?? ref(true)
  return defineComponent({
    name: 'CheckboxListTile',
    render() {
      return h(
        ListTile({
          title,
          trailing,
          leading,
          contentPadding,
          enabled: resolvedEnabled,
          focusColor,
          hoverColor,
          mouseCursor,
          onTap,
          selected,
          selectedTileColor,
          subtitle,
          tileColor,
          _debugClasses,
        })
      )
    },
  })
}
