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

/**
  ## How to use:

  Create models and providers (classes which keep state)

  ```typescript
  export class OrdinaryHumanModel {
    constructor(public name: string) {}
  }

  export class PeopleProvider implements AbstractHumansProvider {
    humans = reactive<OrdinaryHumanModel[]>([])
    add(human: OrdinaryHumanModel) {
      this.humans.push(human)
    }
    get count(): number {
      return this.humans.length
    }
  }

  export class AbstractHumansProvider {
    constructor(public humans: Reactive<OrdinaryHumanModel>[]) {}
    add(human: OrdinaryHumanModel): void {}
    get count(): number {
      return 0
    }
  }

  export class AbstractSolarSystemProvider<
    THumansProvider extends AbstractHumansProvider
  > {
    constructor(
      public planets: Reactive<PlanetModel>[],
      public humansProvider: THumansProvider
    ) {}
  }

  export class PlanetModel {
    constructor(public name: string) {}
  }

  export class SolarSystemProvider
    implements AbstractSolarSystemProvider<AbstractHumansProvider>
  {
    constructor(arg: { humansProvider: AbstractHumansProvider }) {
      const { humansProvider } = arg
      this.humansProvider = humansProvider
    }
    planets: Reactive<PlanetModel[]> = reactive([])
    humansProvider: AbstractHumansProvider
  }
  ```

  Then provide Providers down to tree.

  If you use JSX, then use render

  ```typescript
  MultiProvider.render({
    child: h(...), // or just place any vue component here, like `child: App`,
    providers: [
      new Provider<AbstractHumansProvider>({
        abstract: AbstractHumansProvider,
        builder: () => new PeopleProvider(),
      }),
      new Provider<AbstractSolarSystemProvider<AbstractHumansProvider>>({
        abstract: AbstractSolarSystemProvider,
        builder: ({ getByProvider }) => {
          const humansProvider = getByProvider<AbstractHumansProvider>(
            AbstractHumansProvider
          )
          return new SolarSystemProvider({
            humansProvider: humansProvider,
          })
        },
      }),
    ],
  })
  ```

  For Template syntax use:

  ```html
  <html>
    <multi-provider :providers="providers" />
  </html>
  ```

  ```typescript
  <script>
  import { multiProvider } from "@xsoulspace/vue-provider"
  defineComponent({
    components: { multiProvider },
    setup(){
      const providers = [
        new Provider<AbstractHumansProvider>({
        abstract: AbstractHumansProvider,
          builder: () => new PeopleProvider(),
        }),
        new Provider<AbstractSolarSystemProvider<AbstractHumansProvider>>({
          abstract: AbstractSolarSystemProvider,
          builder: ({ getProvider }) => {
            const humansProvider = getProvider<AbstractHumansProvider>(
              AbstractHumansProvider
            )
            return new SolarSystemProvider({
              humansProvider: humansProvider,
            })
          },
        }),
      ]
      return {providers}
    }
  })

  </script>
  ```

  And somewhere in tree below just call in setup method and use/update its reactive state

  ```typescript
  <script>
  import { MultiProvider } from "@xsoulspace/vue-provider"
  defineComponent({
    setup(){
      const solarSystemProvider = MultiProvider.get<AbstractSolarSystemProvider<AbstractHumansProvider>>(AbstractSolarSystemProvider)

      return {}
    }
  })

  </script>
  ```
**/
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
    function getProvider<TModel>(provider: Constructor<TModel>): TModel {
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
        getProvider,
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
