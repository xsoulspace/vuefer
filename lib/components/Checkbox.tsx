import { defineComponent, h, Ref, watch } from 'vue'
import { Maybe, ValueChanged } from '../abstract/BasicTypes'
import { Color } from '../abstract/Color'
import { Colors } from '../abstract/Colors'
import { Key } from '../abstract/Key'
import { SystemMouseCursor, SystemMouseCursors } from '../abstract/MouseCursor'

interface CheckboxI {
  key?: Maybe<Key>
  value: Ref<boolean>
  onChanged?: Maybe<ValueChanged<boolean>>
  mouseCursor?: Maybe<SystemMouseCursor>
  // activeColor?: Maybe<Color>;
  // fillColor?: Maybe<Color>;
  // checkColor?: Maybe<Color>;
  // focusColor?: Maybe<Color>;
  hoverColor?: Maybe<Color>
  // overlayColor?:Maybe<Color>
  // splashRadius,
  // materialTapTargetSize,
  // autofocus
}

export const Checkbox = ({
  onChanged,
  value,
  // activeColor,
  // checkColor,
  // fillColor,
  // focusColor,
  hoverColor,
  mouseCursor,
}: CheckboxI) => {
  return defineComponent({
    name: 'Checkbox',
    setup() {
      watch(value, async (newValue, oldValue) => {
        if (onChanged) await onChanged(newValue, oldValue)
      })
    },
    render() {
      return h(
        <input
          class={[
            mouseCursor?.css ?? SystemMouseCursors.click,
            hoverColor?.hoverBackgroundCss ?? Colors.indigo.hoverBackgroundCss,
          ]}
          type="checkbox"
          v-model={value.value}
        />
      )
    },
  })
}
