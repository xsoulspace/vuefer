import { defineComponent, h } from 'vue'
import { BoxShadow } from '../abstract/BoxShadow'
import { ButtonStyle } from '../abstract/ButtonStyle'
import { ButtonStyleButton, ButtonStyleButtonI } from './ButtonStyleButton'
export const TextButton = ({
  child,
  onTap,
  style,
  expand,
  _debugClasses,
}: ButtonStyleButtonI) => {
  const defaultStyle = new ButtonStyle({
    elevation: BoxShadow.none,
  })
  const finalStyle = new ButtonStyle({
    ...defaultStyle,
    ...style,
  })
  return defineComponent({
    name: 'TextButton',
    render() {
      return h(
        ButtonStyleButton({
          child,
          _debugClasses,
          expand,
          onTap,
          style: finalStyle,
        })
      )
    },
  })
}
