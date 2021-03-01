export type ValueChanged<T> = (value: Maybe<T>, oldValue?: Maybe<T>) => void
export type Maybe<T> = T | undefined | null

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T
