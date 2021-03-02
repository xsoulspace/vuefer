import { Maybe } from '../abstract/BasicTypes'
import { unifyValue } from './unifyValue'

export const createKeyedMap = <TKey, TValue>({
  arr,
  key,
  unifyValues,
  valueIsKey,
}: {
  arr: TValue[]
  key: keyof TValue
  unifyValues?: Maybe<boolean>
  valueIsKey?: Maybe<boolean>
}) => {
  const map = new Map<TKey, TValue>()

  for (const value of arr) {
    const rawKey = value[key] as any
    const newKey = unifyValues ? unifyValue(rawKey) : rawKey
    map.set(newKey as TKey, valueIsKey ? newKey : value)
  }
  return map
}
export const createKeyedIndexMap = <TKey, TValue>({
  arr,
  key,
  unifyValues,
}: {
  arr: TValue[]
  key: keyof TValue
  unifyValues?: Maybe<boolean>
}) => {
  const map = new Map<TKey, number>()

  for (const [i, value] of arr.entries()) {
    const rawKey = value[key] as any
    const newKey = unifyValues ? unifyValue(rawKey) : rawKey
    map.set(newKey as TKey, i)
  }
  return map
}
