import { Component, reactive, Ref, ref } from 'vue'
import { isNotNull } from '../functions/isNotNull'
import { Maybe, ValueChanged } from './BasicTypes'
import { BoxShadow } from './BoxShadow'
import { DropdownMenuItemConstructor } from './DropdownMenuItem'

// ********* Button interfaces ***********

interface DropdownButtonAbstractI<TValue> {
  items: DropdownMenuItemConstructor<TValue>[]
  minItemHeight?: Maybe<Ref<number>>
  onChanged?: Maybe<ValueChanged<TValue>>
  elevation?: Maybe<BoxShadow>
  icon?: Maybe<Component>
}

export interface MultiDropdownButtonI<
  TValue,
  TKeyValue extends MultiDropdownSelectedItemI<TValue>
> extends DropdownButtonAbstractI<TValue> {
  controller: MultiDropdownFieldController<TValue, TKeyValue>
  onCreateNew?: Maybe<
    ({ editingText }: { editingText: string }) => Promise<void>
  >
  onTapSelected?: Maybe<ValueChanged<TValue>>
  _debugClasses?: Maybe<string>
}

export interface DropdownButtonI<TValue>
  extends DropdownButtonAbstractI<TValue> {
  controller: DropdownFieldController<TValue>
  _debugClasses?: Maybe<string>
}

// ********** Controller interfaces ************

interface DropdownFieldControllerAbstractI {
  readOnly?: Maybe<boolean>
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
  key?: Maybe<string>
}

export interface DropdownFieldControllerI<I>
  extends DropdownFieldControllerAbstractI {
  value?: Maybe<I>
}

export interface MultiDropdownFieldControllerI<TValue>
  extends DropdownFieldControllerAbstractI {
  value?: Maybe<TValue>[]
  keyofValue: keyof TValue
}
/**
 * This class provides a way to create selected items from
 * outside for`{MultiDropdownFieldController.value}`
 */
export type MultiDropdownSelectedItemI<TValue> = {
  key: TValue[keyof TValue] | string
  value: TValue
}
/**
 * This is typeguard for MultiDropdownSelectedItemI interface
 */
export const isMultiDropdownSelectedItem = <
  TValue,
  TKeyValue extends MultiDropdownSelectedItemI<TValue>
>(
  arg: Record<string, unknown>
): arg is TKeyValue => {
  return 'key' in arg && 'value' in arg
}
/**
 * This class provides a way to create selected items from
 * `{ItemBuilder}` for``{MultiDropdown}``
 */
export interface MultiDropdownSelectedValueI<TValue> {
  selected: boolean
  value: TValue
}

class DropdownFieldControllerAbstract {
  readOnly: boolean
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
  constructor({
    maxLength,
    maxLines,
    readOnly,
  }: DropdownFieldControllerAbstractI) {
    this.readOnly = readOnly ?? false
    this.maxLength = maxLength
    this.maxLines = maxLines ?? 1
  }
  get css(): string {
    return ''
  }
}

// ********** Controllers **************

//  TODO: add properties
export class DropdownFieldController<
  I
> extends DropdownFieldControllerAbstract {
  private _reactVal: { val: Maybe<I> | Record<string, unknown> } = reactive({
    val: {},
  })
  key: Ref<Maybe<string>> = ref()
  constructor({
    value,
    readOnly,
    maxLines,
    maxLength,
    key,
  }: DropdownFieldControllerI<I>) {
    super({
      readOnly,
      maxLines,
      maxLength,
    })
    this.key.value = key
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

type TKeyValueIndex = number

//  TODO: add properties
export class MultiDropdownFieldController<
  TValue,
  TKeyValue extends MultiDropdownSelectedItemI<TValue> = MultiDropdownSelectedItemI<TValue>
> extends DropdownFieldControllerAbstract {
  private _reactVal: {
    val: Maybe<TKeyValue>[]
  } = reactive({
    val: [],
  })
  keyofValue: keyof TValue
  constructor({
    value,
    readOnly,
    maxLines,
    maxLength,
    keyofValue,
  }: MultiDropdownFieldControllerI<TValue>) {
    super({
      maxLength,
      maxLines,
      readOnly,
    })
    this.keyofValue = keyofValue
    const keyValues = this.toKeyValues({ values: value ?? [] })
    this.keyValue = keyValues
  }
  toRawValues({ values }: { values: Maybe<TKeyValue>[] }): Maybe<TValue>[] {
    return values.map((el) => el?.value)
  }
  toKeyValues({ values }: { values: Maybe<TValue>[] }): Maybe<TKeyValue>[] {
    return values.filter(isNotNull).map((value) => {
      const key = value[this.keyofValue]
      const keyValue: MultiDropdownSelectedItemI<TValue> = {
        key,
        value,
      }
      if (isMultiDropdownSelectedItem<TValue, TKeyValue>(keyValue)) {
        return keyValue
      }
      return
    })
  }

  get valueIndexesByKeyMap() {
    const map = new Map<TKeyValue['key'] | string, TKeyValueIndex>()

    const filteredValues = this.keyValue.filter(isNotNull)
    for (let i = 0; i < filteredValues.length; i++) {
      const val = filteredValues[i]
      map.set(val.key, i)
    }
    return map
  }
  set keyValue(val: Maybe<TKeyValue>[]) {
    this._reactVal.val = val
  }
  get keyValue() {
    return this._reactVal.val
  }
  set value(val: Maybe<TValue>[]) {
    this.keyValue = this.toKeyValues({
      values: val,
    })
  }
  get value() {
    return this.toRawValues({
      values: this.keyValue,
    })
  }
  get reactive() {
    return this._reactVal
  }
}
