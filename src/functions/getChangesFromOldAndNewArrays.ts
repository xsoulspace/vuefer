import { Maybe } from '../abstract/BasicTypes'
import { unifyValue } from './unifyValue'

const getUnifiedValue = (val: any) => {
  return typeof val == 'object' ? unifyValue({ str: val }) : val
}

export const getChangesFromOldAndNewArrays = <T>({
  newArr,
  oldArr,
  idPropertyName,
  valuePropertyName,
  checkValuesByAllKeys,
  keysToCheckValues,
  exceptKeysFromValuesCheck,
}: {
  newArr: T[]
  oldArr: T[]
  idPropertyName?: keyof T
  valuePropertyName?: keyof T
  checkValuesByAllKeys?: boolean
  keysToCheckValues?: (keyof T)[]
  exceptKeysFromValuesCheck?: (keyof T)[]
}): {
  created: T[]
  updated: T[]
  removed: T[]
} => {
  // Obvious cases
  const isOnlyNewValuesAdded = oldArr.length == 0 && newArr.length > 0
  if (isOnlyNewValuesAdded) {
    return { created: newArr, updated: [], removed: [] }
  }
  const areAllOldValuesDeleted = oldArr.length > 0 && newArr.length == 0

  if (areAllOldValuesDeleted) {
    return { created: [], updated: [], removed: oldArr }
  }
  // compare old and new one
  const compareMap = new Map<string /** typeof T[idPropertyName]**/, T>()
  const newValues: T[] = []
  // find all old values and make changes
  const getValue = (el: T, valueKey: Maybe<keyof T>) => {
    if (valueKey == null) return el
    return (el as any)[valueKey]
  }
  const getKey = (el: T) => {
    const key = getValue(el, idPropertyName)
    return key
  }

  for (const newVal of newArr) {
    const key = getKey(newVal)
    // new cases
    const isKeyIsIdAndEmpty =
      idPropertyName != null &&
      typeof idPropertyName == 'string' &&
      unifyValue({ str: idPropertyName }).includes('id')

    switch (true) {
      case isKeyIsIdAndEmpty:
        newValues.push(newVal)
        break
      default:
        compareMap.set(key, newVal)
        break
    }
  }
  const deletedValues: T[] = []
  // find all new values and make changes
  const updatedValues: T[] = []

  for (const oldVal of oldArr) {
    const oldValueId = getKey(oldVal)

    if (compareMap.has(oldValueId)) {
      const newValue = compareMap.get(oldValueId)
      if (newValue) {
        const isChanged = (() => {
          if (checkValuesByAllKeys) {
            return getIsEntityChanged({
              changed: newValue,
              exceptKeys: exceptKeysFromValuesCheck,
              origin: oldVal,
              keysToCheckValues,
            })
          } else {
            const oldValueUnified = getUnifiedValue(
              getValue(newValue, valuePropertyName)
            )

            const newValueUnified = getUnifiedValue(
              getValue(oldVal, valuePropertyName)
            )

            const isChanged = oldValueUnified != newValueUnified
            return isChanged
          }
        })()
        if (isChanged) updatedValues.push(newValue)
        // no changes, skipping
      } else {
        throw Error(`key is found but no value for ${oldValueId}`)
      }
      compareMap.delete(oldValueId)
    } else {
      deletedValues.push(oldVal)
    }
  }
  return {
    created: [...compareMap.values(), ...newValues],
    updated: updatedValues,
    removed: deletedValues,
  }
}

export const getIsEntityChanged = <T>({
  origin,
  changed,
  exceptKeys,
  keysToCheckValues,
}: {
  origin: T
  changed: T
  exceptKeys: Maybe<(keyof T)[]>
  keysToCheckValues: Maybe<(keyof T)[]>
}) => {
  const getIsValueByKeyChanged = <V>({
    key,
    value,
  }: {
    key: keyof T
    value: V
  }) => {
    if (key in changed) {
      const changedValue = (changed as any)[key]

      const isNotEqual = getUnifiedValue(changedValue) != getUnifiedValue(value)
      if (isNotEqual) return true
    } else {
      return true
    }
  }
  const isKeysToCheckExists = keysToCheckValues != null
  const safeKeysToCheck = keysToCheckValues ?? []
  const preKeys = isKeysToCheckExists
    ? safeKeysToCheck
    : (Object.keys(origin) as (keyof T)[])

  const isExceptKeysExists = exceptKeys != null
  const safeExceptKeys = exceptKeys ?? []
  const keys = isExceptKeysExists
    ? preKeys.filter((key) => !safeExceptKeys.includes(key))
    : preKeys

  for (const key of keys) {
    const value = origin[key]
    const isChanged = getIsValueByKeyChanged({ value, key })
    if (isChanged) return true
  }

  return false
}
