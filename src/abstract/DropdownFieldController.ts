import { reactive, Ref, ref } from 'vue'
import { Maybe } from './BasicTypes'

interface DropdownFieldControllerAbstractI {
  readOnly?: Maybe<boolean>
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
  key?: Maybe<string>
}

interface DropdownFieldControllerI<I> extends DropdownFieldControllerAbstractI {
  value?: Maybe<I>
}

class DropdownFieldControllerAbstract {
  key: Ref<Maybe<string>> = ref()
  readOnly: boolean
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
  constructor({
    key,
    maxLength,
    maxLines,
    readOnly,
  }: DropdownFieldControllerAbstractI) {
    this.key.value = key
    this.readOnly = readOnly ?? false
    this.maxLength = maxLength
    this.maxLines = maxLines ?? 1
  }
  get css(): string {
    return ''
  }
}

//  TODO: add properties
export class DropdownFieldController<
  I
> extends DropdownFieldControllerAbstract {
  private _reactVal: { val: Maybe<I> | Record<string, unknown> } = reactive({
    val: {},
  })
  constructor({
    value,
    readOnly,
    maxLines,
    maxLength,
    key,
  }: DropdownFieldControllerI<I>) {
    super({
      key,
      readOnly,
      maxLines,
      maxLength,
    })
    this.value = value
  }
  set value(val: Maybe<I>) {
    this._reactVal.val = val
  }
  get value() {
    return this._reactVal.val as Maybe<I>
  }

  get reactive() {
    return this._reactVal
  }
}

interface MutliDropdownFieldControllerI<I>
  extends DropdownFieldControllerAbstractI {
  value?: Maybe<I>[]
}

//  TODO: add properties
export class MultiDropdownFieldController<
  I
> extends DropdownFieldControllerAbstract {
  private _reactVal: { val: Maybe<I>[] } = reactive({
    val: [],
  })
  constructor({
    value,
    readOnly,
    maxLines,
    maxLength,
    key,
  }: MutliDropdownFieldControllerI<I>) {
    super({
      key,
      maxLength,
      maxLines,
      readOnly,
    })
    this.value = value ?? []
  }
  set value(val: Maybe<I>[]) {
    this._reactVal.val = val
  }
  get value() {
    return this._reactVal.val
  }
  get reactive() {
    return this._reactVal
  }
}
