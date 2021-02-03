import { reactive, Ref, ref } from 'vue'

interface DropdownFieldControllerI<I> {
  value?: Maybe<I>
  readOnly?: Maybe<boolean>
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
  key?: Maybe<string>
}
//  TODO: add properties
export class DropdownFieldController<I> {
  private _reactVal: { val: Maybe<I> | Record<string, unknown> } = reactive({
    val: {},
  })
  key: Ref<Maybe<string>> = ref()
  readOnly: boolean
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
  constructor({
    value,
    readOnly,
    maxLines,
    maxLength,
    key,
  }: DropdownFieldControllerI<I>) {
    this.value = value
    this.key.value = key
    this.readOnly = readOnly ?? false
    this.maxLength = maxLength
    this.maxLines = maxLines ?? 1
  }
  set value(val: Maybe<I>) {
    this._reactVal.val = val
  }
  get value() {
    return this._reactVal.val as Maybe<I>
  }

  get css(): string {
    return ''
  }
  get reactive() {
    return this._reactVal
  }
}
