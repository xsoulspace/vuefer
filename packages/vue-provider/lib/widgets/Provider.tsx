import {
  defineComponent,
  h,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  provide,
} from 'vue'
import {
  ComponentProviders,
  Constructor,
  Maybe,
  MultiProviderI as MultiProviderBuilder,
  Provider,
  RecordedProviders,
} from '../abstract/BasicTypes'

export class MultiProvider {
  static _getSymbol({
    modelName,
  }: {
    modelName: Constructor<unknown>['name']
  }): symbol {
    return this._allProvidersSymbols.get(modelName)!
  }
  static _setSymbol({
    modelName,
  }: {
    modelName: Constructor<unknown>['name']
  }): symbol {
    const newProviderSymbol = Symbol()
    this._allProvidersSymbols.set(modelName, newProviderSymbol)!
    return newProviderSymbol
  }
  static _allProvidersSymbols = new Map<Constructor<unknown>['name'], symbol>()

  static _cleanUpProviders({
    recordedProviders,
  }: {
    recordedProviders: RecordedProviders
  }) {
    for (const providerSymbol of Object.keys(recordedProviders)) {
      this._allProvidersSymbols.delete(providerSymbol)
    }
  }

  static _provide({ recordedProviders, providers }: ComponentProviders) {
    function getByProvider<TModel>({ provider }) {
      const recordedProvider =
        recordedProviders[
          MultiProvider._getSymbol({ modelName: provider.name })
        ]
      return recordedProvider ?? MultiProvider.get<TModel>(provider)
    }

    for (const provider of providers) {
      if (provider == null) throw Error(`${provider} cannot be null!`)

      const providerSymbol = this._setSymbol({
        modelName: provider.abstract.name,
      })

      const instance = provider.builder({
        getByProvider,
      })

      provide(providerSymbol, instance)
      recordedProviders[providerSymbol] = instance
    }
  }

  static render({ providers, child }: MultiProviderBuilder) {
    return defineComponent({
      name: 'MultiProvider',
      setup() {
        const recordedProviders: RecordedProviders = {}

        onBeforeMount(() => {
          MultiProvider._provide({
            recordedProviders,
            providers,
          })
        })
        onBeforeUnmount(() => {
          MultiProvider._cleanUpProviders({ recordedProviders })
        })
        return {}
      },
      render() {
        return h(child)
      },
    })
  }
  static get<T, P extends Constructor<T> = Constructor<T>>(providerModel: P) {
    const symbol = this._allProvidersSymbols.get(providerModel.name)
    if (symbol == null) throw Error(`${providerModel} doesn't have a provider!`)

    const provider: Maybe<T> = inject(symbol)

    if (provider == null)
      throw new Error(`${providerModel} have a provider but return null:(!`)
    return provider
  }
}

export const multiProviderComponent = defineComponent({
  name: 'MultiProvider',
  props: {
    providers: {
      required: true,
      type: Array,
    },
  },
  render() {
    return h('div', {}, this.$slots.default?.call(this))
  },
  setup(props) {
    const recordedProviders: RecordedProviders = {}

    onBeforeMount(() => {
      MultiProvider._provide({
        recordedProviders,
        providers: props.providers as Provider<unknown>[],
      })
    })
    onBeforeUnmount(() => {
      MultiProvider._cleanUpProviders({ recordedProviders })
    })

    return {}
  },
})
