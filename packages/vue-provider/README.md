Dependecy injection provider heavily inspired by Flutter [Provider](https://pub.dev/packages/provider)

Provide state down easy:)
Works only with vue3 and uses `provide` `inject` system

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
defineComponent({
  setup(){
    const providers = [HeroesProvider]
    return {providers}
  }
})

</script>
```

And somewhere in tree just call in setup method

```typescript
const heroProvider = MultiProvider.get<HeroesProvider>(HeroesProvider)
```
