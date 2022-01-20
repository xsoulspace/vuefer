Dependecy injection provider heavily inspired by Flutter [Provider](https://pub.dev/packages/provider)

Provide state down easy:)

Works only with `vue3` and uses its `provide` `inject` system under the hood

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
