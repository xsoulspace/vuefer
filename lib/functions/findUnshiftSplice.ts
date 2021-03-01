/*======================================
********* COMMON FUNCTIONS ************* 
========================================*/

import { Maybe } from '../abstract/BasicTypes'
import { unifyValue } from './unifyValue'

export const checkId = <T>(e: T) => {
  switch (typeof e) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'bigint':
    case 'symbol':
      return e
    case 'object':
      if ('id' in e) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (e as any)['id']
      }
      // try to search for key with id
      const ids: string[] = []
      for (const key of Object.keys(e)) {
        if (typeof key === 'string' && key.toLowerCase().includes('_id')) {
          ids.push(key)
        }
      }
      switch (ids.length) {
        case 1:
          const idKey = ids[0]
          if (idKey in e) {
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            return (e as any)[idKey]
          }
      }
    default:
      throw Error(
        `find and unshift or splice - check id - ${JSON.stringify(e)} is null`
      )
  }
}
const getId = <T>(el: T, idKey: Maybe<keyof T>) => {
  return idKey && idKey in el && el[idKey] ? el[idKey] : checkId(el)
}

const prepareIdToCompare = <T>(id: T) => {
  return unifyValue({ str: id })
}
const getIndexById = <T>({
  arr,
  idToFind,
  idKey,
}: {
  arr: T[]
  idToFind: unknown
  idKey: Maybe<keyof T>
}) => {
  const index = arr.findIndex((e) => {
    return prepareIdToCompare(getId(e, idKey)) == idToFind
  })
  const isExists = index != null && index >= 0
  return { isExists, index }
}
export const findSpliceAndAdd = <T>({
  elToSplice,
  arr,
  arrToAdd,
  idKey,
}: {
  elToSplice: T
  arr: T[]
  arrToAdd?: Maybe<T[]>
  idKey: Maybe<keyof T>
}) => {
  const id = prepareIdToCompare(getId(elToSplice, idKey))
  const usingArr = arr ?? []
  const verifiedArrToAdd = arrToAdd ?? []
  if (usingArr.length == 0 && verifiedArrToAdd.length > 0) {
    return verifiedArrToAdd
  }
  const { index, isExists } = getIndexById({
    arr: usingArr,
    idKey,
    idToFind: id,
  })
  if (isExists) {
    usingArr.splice(index, 1, ...verifiedArrToAdd)
  }
  return usingArr
}
/**
 * if you need to point an id key, use findSpliceAndAdd
 * @param el
 * @param arr
 * @param els
 */
export const findAndSplice = <T>({
  arr,
  arrToAdd,
  elToSplice,
}: {
  elToSplice: T
  arr: T[]
  arrToAdd?: Maybe<T[]>
}) => {
  return findSpliceAndAdd({
    arr,
    arrToAdd,
    elToSplice,
    idKey: null,
  })
}
export const findUpdateOrUnshift = <T>({
  arr,
  arrToAdd,
  idKey,
}: {
  arr: Maybe<T[]>
  arrToAdd: T[]
  idKey: Maybe<keyof T>
}) => {
  const usingArr = arr ?? []
  if (arrToAdd.length == 0) return usingArr
  switch (usingArr.length) {
    case 0:
      return arrToAdd
    default:
      for (const el of arrToAdd) {
        const id = prepareIdToCompare(getId(el, idKey))
        const { isExists, index } = getIndexById({
          arr: usingArr,
          idToFind: id,
          idKey,
        })
        if (isExists) {
          usingArr.splice(index, 1, el)
        } else {
          usingArr.unshift(el)
        }
      }
  }
  return usingArr
}
/**
 * if you need to point an id key, use findUpdateOrUnshift
 * @param el
 * @param arr
 * @param els
 */
export const findOrUnshift = <T>({
  arr,
  arrToAdd,
}: {
  arr: Maybe<T[]>
  arrToAdd: T[]
}) => {
  return findUpdateOrUnshift({
    arr,
    arrToAdd,
    idKey: null,
  })
}
