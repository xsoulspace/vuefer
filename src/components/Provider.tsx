import { Component, defineComponent, h, onMounted } from '@vue/runtime-core'
import { inject, provide, reactive } from 'vue'
import { Constructor, Maybe } from '../abstract/BasicTypes'
interface MultiProviderI {
  models: Maybe<CallableFunction | Constructor<unknown>>[]
  child: Component
}
export class MultiProvider {
  private static _allProvidersSymbols = new Map<
    CallableFunction | NewableFunction,
    symbol
  >()

  static create({ models, child }: MultiProviderI) {
    return defineComponent({
      name: 'MultiProvider',
      setup() {
        const initModels = reactive({})
        onMounted(() => {
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
            MultiProvider._allProvidersSymbols.set(model, newProviderSymbol)
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
  static get<T extends CallableFunction | Constructor<unknown>>(modelName: T) {
    const symbol = MultiProvider._allProvidersSymbols.get(modelName)
    if (symbol == null) throw Error(`${modelName} doen't have a provider!`)
    const model: Maybe<T> = inject(symbol)
    if (model == null)
      throw new Error(`${modelName} have a provider but return null:(!`)
    return model
  }
}
