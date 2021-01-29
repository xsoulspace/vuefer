import { Ref, ref } from 'vue'

interface DropdownFieldControllerI<I> {
  value: Maybe<I>
  readOnly?: Maybe<boolean>
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
  key: Maybe<string>
}
//  TODO: add properties
export class DropdownFieldController<I> {
  value: Ref<Maybe<I>> = ref()
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
    this.value.value = value
    this.key.value = key
    this.readOnly = readOnly ?? false
    this.maxLength = maxLength
    this.maxLines = maxLines ?? 1
  }

  get css(): string {
    return ''
  }
}
