import { Component, defineComponent, h } from '@vue/runtime-core'
import { inject, onBeforeMount, provide, reactive } from 'vue'
import { Constructor, Maybe } from '../abstract/BasicTypes'
interface MultiProviderI {
  models: Maybe<CallableFunction | Constructor<unknown>>[]
  child: Component
}
export class MultiProvider {
  static allProvidersSymbols = new Map<
    CallableFunction | Constructor<unknown>,
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
            providerThis.allProvidersSymbols.set(model, newProviderSymbol)
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
    const symbol = this.allProvidersSymbols.get(modelName)
    if (symbol == null) throw Error(`${modelName} doen't have a provider!`)
    const model: Maybe<T> = inject(symbol)
    if (model == null)
      throw new Error(`${modelName} have a provider but return null:(!`)
    return model
  }
}
