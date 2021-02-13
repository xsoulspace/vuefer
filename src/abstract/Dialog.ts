import { ref } from '@vue/reactivity'
import { Maybe } from './BasicTypes'

export class DialogController {
  private _isOpen = ref(false)

  constructor({ isOpen }: { isOpen?: Maybe<boolean> }) {
    this._isOpen.value = isOpen ?? false
  }
  set isOpen(isOpen: boolean) {
    this._isOpen.value = isOpen
  }
  get isOpen() {
    return this._isOpen.value
  }
  get reactive() {
    return this._isOpen
  }
}
