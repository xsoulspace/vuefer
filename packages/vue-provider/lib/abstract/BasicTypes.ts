import { Component } from 'vue'

export type ValueChanged<T> = (value: Maybe<T>, oldValue?: Maybe<T>) => void
export type Maybe<T> = T | undefined | null

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T

export type GetProviderCallback = <TModel>(
  provider: Constructor<TModel>
) => TModel

export type ProviderBuilder<TModel> = (arg: {
  getProvider: GetProviderCallback
}) => TModel

export class Provider<TModel> {
  abstract: Constructor<TModel>
  builder: ProviderBuilder<TModel>

  constructor({ abstract, builder }: ProviderArg<TModel>) {
    this.abstract = abstract
    this.builder = builder
  }
}

export interface ProviderArg<TModel> {
  abstract: Constructor<TModel>
  builder: ProviderBuilder<TModel>
}

export interface MultiProviderI {
  providers: Provider<unknown>[]
  child: Component
}

export interface RecordedProviders {
  [property: symbol]: any
}

export interface ComponentProviders {
  recordedProviders: RecordedProviders
  providers: Provider<unknown>[]
}
