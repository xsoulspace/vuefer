export type ValueChanged<T> = (value: T, oldValue?: Maybe<T>) => void
export type Maybe<T> = T | undefined | null
export type Constructor<T> = new (...args: any[]) => T
