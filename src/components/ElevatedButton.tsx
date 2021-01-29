import { defineComponent, h } from 'vue'
import { ButtonStyleButton, ButtonStyleButtonI } from './ButtonStyleButton'
// interface ElevatedButtonI extends ButtonStyleButtonI {}
export const ElevatedButton = ({ child, onTap, style }: ButtonStyleButtonI) => {
  return defineComponent({
    name: 'ElevatedButton',
    render() {
      return h(
        ButtonStyleButton({
          child,
          onTap,
          style,
        })
      )
    },
  })
}
