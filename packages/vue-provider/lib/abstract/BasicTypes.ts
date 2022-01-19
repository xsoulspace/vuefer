import { Component } from 'vue'

export type ValueChanged<T> = (value: Maybe<T>, oldValue?: Maybe<T>) => void
export type Maybe<T> = T | undefined | null

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T

export type ProviderBuilder<T> = ({}: {}) => T

export interface Provider<T> {
  abstract: Constructor<T>
  builder: ProviderBuilder<T>
}
export interface MultiProviderI {
  providers: Provider<unknown>[]
  child: Component
}

export type GetProviderCallback<TModel> = ({
  provider,
}: {
  provider: Constructor<unknown>
}) => TModel

export interface RecordedProviders {
  [property: symbol]: any
}

export interface ComponentProviders {
  recordedProviders: RecordedProviders
  providers: Provider<unknown>[]
}
