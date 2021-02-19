import { Component, reactive, Ref, ref } from 'vue'
import { createKeyedMap } from '../functions/createMap'
import { isNotNull } from '../functions/isNotNull'
import { Maybe, ValueChanged } from './BasicTypes'
import { BoxShadow } from './BoxShadow'
import { DropdownMenuItemConstructor } from './DropdownMenuItem'

// ********* Button interfaces ***********

interface DropdownButtonAbstractI<I> {
  items: DropdownMenuItemConstructor<I>[]
  minItemHeight?: Maybe<Ref<number>>
  onChanged?: Maybe<ValueChanged<I>>
  elevation?: Maybe<BoxShadow>
  icon?: Maybe<Component>
}

export interface MultiDropdownButtonI<I> extends DropdownButtonAbstractI<I> {
  controller: MutliDropdownFieldController<I>
  onCreateNew?: Maybe<
    ({ editingText }: { editingText: string }) => Promise<void>
  >
}

export interface DropdownButtonI<I> extends DropdownButtonAbstractI<I> {
  controller: DropdownFieldController<I>
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
  TKeyValue extends MutliDropdownSelectedItem<TValue> = MutliDropdownSelectedItem<TValue>
> extends DropdownFieldControllerAbstractI {
  value?: Maybe<TKeyValue>[]
}

interface MutliDropdownSelectedItemI<TValue> {
  key: string
  value: TValue
}

export class MutliDropdownSelectedItem<TValue> {
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

//  TODO: add properties
export class MutliDropdownFieldController<
  TValue,
  TKeyValue extends MutliDropdownSelectedItem<TValue> = MutliDropdownSelectedItem<TValue>
> extends DropdownFieldControllerAbstract {
  private _reactVal: { val: Maybe<TKeyValue>[] } = reactive({
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
  get keyedValuesMap() {
    const map = createKeyedMap<TKeyValue['key'], TKeyValue>({
      arr: this.value.filter(isNotNull),
      key: 'key',
      unifyValues: false,
    })
    return map
  }
  set value(val: Maybe<TKeyValue>[]) {
    this._reactVal.val = val
  }
  get value() {
    return this._reactVal.val
  }
  get reactive() {
    return this._reactVal
  }
}
