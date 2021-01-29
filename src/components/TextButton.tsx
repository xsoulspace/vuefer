import { defineComponent, h } from 'vue'
import { BoxShadow, ButtonStyle } from '../abstract'
import { ButtonStyleButton, ButtonStyleButtonI } from './ButtonStyleButton'
export const TextButton = ({
  child,
  onTap,
  style,
  key,
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
          onTap,
          style: finalStyle,
        })
      )
    },
  })
}
