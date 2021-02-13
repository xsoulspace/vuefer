import { Maybe } from '../abstract/BasicTypes'

export const isNotNull = <T>(t: Maybe<T>): t is T => t != null
