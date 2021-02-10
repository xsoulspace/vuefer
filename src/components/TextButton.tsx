import { defineComponent, h } from 'vue'
import { ButtonStyleButton, ButtonStyleButtonI } from '.'
import { BoxShadow, ButtonStyle } from '..'
export const TextButton = ({
  child,
  onTap,
  style,
  key,
  expand,
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
          expand,
          onTap,
          style: finalStyle,
        })
      )
    },
  })
}
