## 0.6.0

feat: Provider - use provide/inject under the hood

### Usage:

Let's suppose we have a model:

```typescript
export class Hero {
  constructor(public name: string) {}
}
export class HeroesModel {
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

```typescript
MultiProvider.create({
  models: [HeroesModel],
  child: wrapperApp(),
})
```

And somewhere in tree just call

```typescript
const heroModel = MultiProvider.get<HeroesModel>(HeroesModel)
```

feat: Dialog - use Navigator
feat: Navigator - to manage Dialoges

## 0.5.0

Add: GridView.builder, GridViewItem with awesome [vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout/v/3.0.0-beta1)
Add: Wrap
Refactor: a little bit more orginized structure of imports
Refactor: ListItemBuilder now is ItemBuilder

## 0.4.0

Add: Stack, Positioned
Add: DropdownButton with virtual list
Add: basic Visibility
Update: simplified api for SizedBox, cursor

## 0.3.0

Add: ElevatedButton, TextButton, Opacity Widget, OpacityDecoration
Add: SizedBox
Add: basic TextField
Add: basic Checkbox
Add: ColoredBox
Add: basic ListTile, CheckboxListTile
Add: ListView.builder with awesome [vue3-virtual-scroller!](https://www.npmjs.com/package/vue3-virtual-scroller)

ListView must be used inside SizedBox, as in example below

```typescript
SizedBox({
  child: ListView.builder({
    itemBuilder: ({ index }) => {
      const value = obj.value[index]
      return ElevatedButton({
        style: new ButtonStyle({
          backgroundColor: Colors.grey,
          textStyle: new TextStyle({
            color: Colors.white,
            decoration: new TextDecoration({
              decoration: TextDecorations.lineThrough,
            }),
          }),
        }),
        child: Text({
          text: ref(value),
        }),
        onTap: () => alert(`hello tap with index ${index} and value ${value}!`),
      })
    },
    itemCount: itemCount,
  }),
  height: new SizedBoxHeight({
    height: EdgeInsetsStep.s60,
  }),
  width: new SizedBoxWidth({
    width: EdgeInsetsStep.s96,
  }),
})
```

## 0.2.1

Add: Text Widget, FontWeight, TextDecoration, TextStyle, TextAlign, TextOverflow, FontSize

## 0.1.1

Add: declarations files
