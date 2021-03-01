import {
  Component,
  defineComponent,
  h,
  inject,
  onBeforeMount,
  provide,
  reactive,
} from 'vue'
import { Constructor, Maybe } from '../abstract/BasicTypes'
interface MultiProviderI {
  models: Maybe<CallableFunction | Constructor<unknown>>[]
  child: Component
}
/**
 *
 * Let's suppose we have a model:
 *
 *  ```typescript
 *  export class Hero {
 *    constructor(public name: string) {}
 *  }
 *  export class HeroesModel {
 *    heroes = reactive<Maybe<Hero>[]>([])
 *    add(hero: Hero) {
 *      this.heroes.push(hero)
 *    }
 *    get count() {
 *      return this.heroes.length
 *    }
 *  }
 *  ```
 *
 *  Create Provider on top of tree
 *
 *  ```typescript
 *  MultiProvider.create({
 *    models: [HeroesModel],
 *    child: wrapperApp(),
 *  })
 *  ```
 *
 *  And somewhere in tree just call
 *
 *  ```typescript
 *  const heroModel = MultiProvider.get<HeroesModel>(HeroesModel)
 *  ```
 *
 */
export class MultiProvider {
  static allProvidersSymbols = new Map<
    CallableFunction['name'] | Constructor<unknown>['name'],
    symbol
  >()

  static create({ models, child }: MultiProviderI) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const providerThis = this
    return defineComponent({
      name: 'MultiProvider',
      setup() {
        const initModels = reactive({})

        onBeforeMount(() => {
          for (const model of models) {
            if (model == null) throw Error(`${model} cannot be null!`)
            const newProviderSymbol = Symbol()
            const finalModel = (() => {
              try {
                // lets suppose model is newable function
                const newableModel = model as Constructor<unknown>
                const newModel = new newableModel()
                return newModel
              } catch (error) {
                // try as callable
                const callableModel = model as CallableFunction
                const newFunctionModel = callableModel()
                return newFunctionModel
              }
            })()
            provide(newProviderSymbol, finalModel)
            providerThis.allProvidersSymbols.set(model.name, newProviderSymbol)
            initModels[model.name] = finalModel
          }
        })
        return { initModels }
      },
      render() {
        return h(child)
      },
    })
  }
  static get<T, P extends CallableFunction | Constructor<T> = Constructor<T>>(
    modelName: P
  ) {
    const symbol = this.allProvidersSymbols.get(modelName.name)
    if (symbol == null) throw Error(`${modelName} doen't have a provider!`)
    const model: Maybe<T> = inject(symbol)
    if (model == null)
      throw new Error(`${modelName} have a provider but return null:(!`)
    return model
  }
}
