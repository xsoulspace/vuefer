import {
  Component,
  defineComponent,
  h,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  provide,
  reactive,
} from 'vue'
import { Constructor, Maybe } from '../abstract/BasicTypes'
interface MultiProviderI {
  models: Maybe<CallableFunction | Constructor<unknown>>[]
  child: Component
}

enum InstanceTypes {
  class = 'class',
  function = 'function',
}
/** 
  ## How to use:

  Let's suppose we have a Hero model and a Provider with own state:

  ```typescript
  export class HeroModel {
    constructor(public name: string) {}
  }

  export class HeroesProvider {
    heroes = reactive<Maybe<Hero>[]>([])
    add(hero: Hero) {
      this.heroes.push(hero)
    }
    get count() {
      return this.heroes.length
    }
  }
  ```

  Create Provider on top of tree

  For JSX use:

  ```typescript
  MultiProvider.create({
    models: [HeroesProvider],
    child: wrapperApp(),
  })
  ```

  For Template use:

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
      const providers = [HeroesProvider]
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
      const heroProvider = MultiProvider.get<HeroesProvider>(HeroesProvider)

      return {}
    }
  })

  </script>
  ```
**/
export class MultiProvider {
  static _allProvidersSymbols = new Map<
    CallableFunction['name'] | Constructor<unknown>['name'],
    symbol
  >()
  static _checkIsFunctionOrClass<T>(
    provider: CallableFunction | Constructor<unknown>
  ): {
    instance: T
    type: InstanceTypes
  } {
    try {
      // lets suppose model is newable function
      const newableProvider = provider as Constructor<unknown>
      const newProvider = new newableProvider()
      return { instance: newProvider as T, type: InstanceTypes.class }
    } catch (error) {
      // try as callable
      const callableProvider = provider as CallableFunction
      const newFunctionProvider = callableProvider()
      return {
        instance: newFunctionProvider as T,
        type: InstanceTypes.function,
      }
    }
  }
  static build({ models: providers, child }: MultiProviderI) {
    return defineComponent({
      name: 'MultiProvider',
      setup() {
        const initProviders = reactive({})

        onBeforeMount(() => {
          for (const provider of providers) {
            if (provider == null) throw Error(`${provider} cannot be null!`)
            const newProviderSymbol = Symbol()
            const { instance } = MultiProvider._checkIsFunctionOrClass(provider)
            provide(newProviderSymbol, instance)
            MultiProvider._allProvidersSymbols.set(
              provider.name,
              newProviderSymbol
            )
            initProviders[provider.name] = instance
          }
        })
        onBeforeUnmount(() => {
          for (const providerName of Object.keys(initProviders)) {
            MultiProvider._allProvidersSymbols.delete(providerName)
          }
        })
        return { initProviders }
      },
      render() {
        return h(child)
      },
    })
  }
  static get<T, P extends CallableFunction | Constructor<T> = Constructor<T>>(
    providerName: P
  ) {
    const symbol = this._allProvidersSymbols.get(providerName.name)
    if (symbol == null) throw Error(`${providerName} doesn't have a provider!`)

    const provider: Maybe<T> = inject(symbol)

    if (provider == null)
      throw new Error(`${providerName} have a provider but return null:(!`)
    return provider
  }
}

export const multiProvider = defineComponent({
  name: 'MultiProvider',
  props: {
    providers: {
      required: true,
      type: Array,
    },
  },
  setup(props) {
    const initProviders = reactive({})

    onBeforeMount(() => {
      for (const provider of props.providers) {
        if (provider == null) throw Error(`${provider} cannot be null!`)

        const newProviderSymbol = Symbol()
        const effectiveProvider = provider as any

        const { instance } =
          MultiProvider._checkIsFunctionOrClass(effectiveProvider)

        provide(newProviderSymbol, instance)

        const providerName = effectiveProvider.name
        MultiProvider._allProvidersSymbols.set(providerName, newProviderSymbol)
        initProviders[providerName] = instance
      }
    })

    onBeforeUnmount(() => {
      for (const providerName of Object.keys(initProviders)) {
        MultiProvider._allProvidersSymbols.delete(providerName)
      }
    })

    return { initProviders }
  },
})
