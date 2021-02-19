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
  TKeyValue extends MutliDropdownSelectedItem<TValue>
> extends DropdownButtonAbstractI<TValue> {
  controller: MutliDropdownFieldController<TValue, TKeyValue>
  onCreateNew?: Maybe<
    ({ editingText }: { editingText: string }) => Promise<void>
  >
  onTapSelected?: Maybe<ValueChanged<TValue>>
}

export interface DropdownButtonI<TValue>
  extends DropdownButtonAbstractI<TValue> {
  controller: DropdownFieldController<TValue>
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

export interface MutliDropdownFieldControllerI<
  TValue,
  TKeyValue extends MutliDropdownSelectedItem<TValue>
> extends DropdownFieldControllerAbstractI {
  value?: Maybe<TKeyValue>[]
}

interface MutliDropdownSelectedItemI<TValue> {
  key: string
  value: TValue
}
/**
 * This class provides a way to create selected items from
 * outside for`{MutliDropdownFieldController.value}`
 */
export class MutliDropdownSelectedItem<
  TValue extends
    | string
    | number
    | boolean
    | { [prop: string]: any }
    | { [prop: number]: any }
> {
  key: string
  value: TValue

  constructor({ key, value }: MutliDropdownSelectedItemI<TValue>) {
    this.key = key
    this.value = value
  }

  static use<TValue>(arg: MutliDropdownSelectedItemI<TValue>) {
    return new MutliDropdownSelectedItem<TValue>(arg)
  }
}
/**
 * This class provides a way to create selected items from
 * `{ItemBuilder}` for``{MutliDropdown}``
 */
export interface MutliDropdownSelectedValueI<TValue> {
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
export class MutliDropdownFieldController<
  TValue,
  TKeyValue extends MutliDropdownSelectedItem<TValue>
> extends DropdownFieldControllerAbstract {
  private _reactVal: {
    val: Maybe<MutliDropdownSelectedItem<TValue>>[]
  } = reactive({
    val: [],
  })
  constructor({
    value,
    readOnly,
    maxLines,
    maxLength,
  }: MutliDropdownFieldControllerI<TValue, TKeyValue>) {
    super({
      maxLength,
      maxLines,
      readOnly,
    })
    this.value = value ?? []
  }
  get valueIndexesByKeyMap() {
    const map = new Map<TKeyValue['key'], TKeyValueIndex>()

    const filteredValues = this.value.filter(isNotNull)
    for (let i = 0; i < filteredValues.length; i++) {
      const val = filteredValues[i]
      map.set(val.key, i)
    }
    return map
  }
  set value(val: Maybe<MutliDropdownSelectedItem<TValue>>[]) {
    this._reactVal.val = val
  }
  get value() {
    return this._reactVal.val
  }
  get reactive() {
    return this._reactVal
  }
}
