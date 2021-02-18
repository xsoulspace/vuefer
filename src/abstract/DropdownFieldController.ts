import { Component, reactive, Ref, ref } from 'vue'
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

export interface MutliDropdownFieldControllerI<I>
  extends DropdownFieldControllerAbstractI {
  value?: Maybe<I>[]
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

// ********** Controllers **************

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

//  TODO: add properties
export class MutliDropdownFieldController<
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
