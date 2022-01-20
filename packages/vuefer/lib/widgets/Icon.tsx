import { defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { Color } from '../abstract/Color'
import { EdgeInsetsStep } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'

export enum Icons {
  arrow_drop_down = '',
}

interface IconI {
  size?: Maybe<EdgeInsetsStep>
  color?: Maybe<Color>
  key?: Maybe<Key>
}
export const Icon = (_icon: Icons, _config?: IconI) => {
  // const { size, key, color } = config ?? {}
  return defineComponent({
    name: 'Icon',
    render() {
      return h('div', {
        class: '',
      })
    },
  })
}
