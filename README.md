# Vuefer just a way to write Vue3 styled like Flutter with Tailwind CSS

<p align="center">
  <a title="License" href="https://github.com/xsoulspace/vuefer/blob/master/LICENSE" ><img src="https://img.shields.io/github/license/xsoulspace/vuefer.svg" /></a>
  <a title="Discord" href="https://discord.com/invite/y54DpJwmAn" ><img src="https://img.shields.io/discord/696688204476055592.svg" /></a>
  <a title="Contributor Covenant" href="https://github.com/xsoulspace/vuefer/blob/master/CODE_OF_CONDUCT.md" ><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" /></a>
  <a title="Contributors" href="https://github.com/xsoulspace/vuefer/graphs/contributors" ><img src="https://img.shields.io/github/contributors/xsoulspace/vuefer.svg" /></a>
  <a href="https://patreon.com/arenukvern"><img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Darenukvern%26type%3Dpatrons&style=flat" alt="Support me on Patreon" /></a>
</p>

**Please notice:** this project was renamed from vuefer to independent name: vuefer

**Please notice:** this project is a work in progress and completely experimental!

**Please notice:** `vue-provider` now is maintained as standalone package. Please see it in [packages/vue-provider](https://github.com/xsoulspace/vuefer/tree/next/packages/vue-provider)

The reason & motivation why this project have been started is a question: Flutter & Dart awesome! Vue3 & Typescript awesome too!

But...

html+css or jsx are not providing a strong enough typing way to write widgets/components.

So, what if we will write Vue3 TS in style of Flutter, because it's just simplier and faster?

Purpose: fast prototyping and fast MVP development

Please notice:

- It is **not** a Flutter **at all** and even close, but hopefully will be use its style of components & methods writing.
- It is **not** properly written **at all** and cannot be used in production until release 1.
- It is not aligned to any standard yet and do not have any styling at all and it looks bad:) as primary focus now is to write basic widgets.
- All is **subject to change** until release 1.
- If you like this project - contributing &|| star is very welcome and appreciated and will keep development running Open Source and free:)

### Awesome tools used and many thanks to:

- Typescript
- Vue3
- Tailwind
- [vue3-virtual-scroller](https://www.npmjs.com/package/vue3-virtual-scroller)
- [vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout/v/3.0.0-beta1) - temporary deprecated as it is broken
- [vue-draggable-next](https://github.com/anish2690/vue-draggable-next)

### Installation

Add this package to your package.json file:

```json
"dependencies": {
  "@xsoulspace/vuefer": "next"
}
```

add styling to your main.ts

```typescript
import '@xsoulspace/vuefer/dist/vft.css'
```

add styling to app div (temporary and will be removed during Scaffold widget refactoring)

```html
<div id="app" class="absolute left-0 right-0 top-0 bottom-0"></div>
```

### Usage

```typescript
export const wrapperApp = () => {
  const text = ref('Hello world!')
  const text2 = ref(2)
  const padding = EdgeInsets.all(EdgeInsetsStep.s3)

  const textCard = Padding({
    child: Text({
      text,
    }),
    padding,
  })

  const btn = ElevatedButton({
    child: Text({ text: ref('Hello Button') }),
    onPressed: () => {
      text2.value++
      text.value = `Hello Wolrd! Counter: ${text2.value}`
    },
  })

  return Scaffold({
    body: Align({
      overlay: true,
      alignment: Alignment.bottom,
      child: Container({
        padding,
        decoration: new BoxDecoration({
          boxShadow: BoxShadow.xl,
          borderRadius: BorderRadius.vertical({ bottom: BorderRadiusStep.xxl }),
        }),
        child: Row({
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            MouseRegion({
              child: btn,
              cursor: SystemMouseCursor.use({
                cursor: SystemMouseCursors.click,
              }),
            }),
            textCard,
          ],
        }),
      }),
    }),
  })
}
```

# Roadmap

## Ready to test and possible to use

- [] Provider

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

- [x] Text Widget, FontWeight, TextDecoration, TextStyle, TextAlign, TextOverflow
- [x] Alignment, Align, Center
- [x] Padding
- [x] Margin
- [x] ButtonStyleButton
- [x] Flex
- [x] Row (Flex -> row)
- [x] Column (Flex -> column)
- [x] DividerDecoration (only for Row, Column)
- [x] MouseRegion
- [x] TextButton
- [x] Elevated Button
- [x] ListView.builder made with [vue3-virtual-scroller](https://www.npmjs.com/package/vue3-virtual-scroller) - must be placed inside SizedBox to have defined size
- [x] ConstrainedBox
- [x] SizedBox
- [x] Opacity
      [x] widget
      [x] Text
- [x] ColoredBox
- [x] CheckboxListTile
- [x] ListTile
- [x] Grid, GridTile with awesome [vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout/v/3.0.0-beta1) - temporary deprecated as it is broken
- [x] Wrap (Flex - flex-wrap)
- [x] Dialog

### Usage

First - get NavigationController in setup

Be sure that you have Navigation widget on top of tree

```typescript
const navigationController =
  MultiProvider.get<NavigationController>(NavigationController)
```

Second call a function from for example Button.onTap:

```typescript
ElevatedButton({
  child: Text({
    text: ref('Show dialog'),
  }),
  onTap: () => {
    showDialog({
      builder: Dialog({
        child: Text({ text: ref('Hello World') }),
      }),
      navigationController,
    })
  },
}),
```

To close, just use `navigationController.pop()`

- [x] MultiDropdown Button

Usage:

Create controller in setup or anywehere and
give generic type to use

```typescript
const IndexedText {
  id: string
  text: string
}


const multiDropdownController = new MultiDropdownFieldController<IndexedText>(
  { keyofValue: 'id' }
)
```

Then use MultiDropdownButton with DropdownMenuItem in items
to make it work

```typescript
MultiDropdownButton({
  controller: multiDropdownController,
  items: dropdownItems.map((el) =>
    DropdownMenuItem({
      child: Text({
        text: ref(el.text),
      }),
      value: el,
      key: el.id,
      title: el.text,
    })
  ),
}),
```

To get or change selected values use:
`controller.value`

- [x] Navigation & NavigationController

  - [x] Popup (with background) functionality
  - [x] Fullscreen functionality

### Usage:

Add controller into MultiPorvider and Navigation widget below:

```typescript
MultiProvider.create({
  models: [NavigationController, ...],
  child: Navigation({
    child: ...,
  }),
})
```

- [x] DropdownButton, DropdownButtonItem
      [x] functionality
      [] decoration

- [] Visibility
  [x] functionality
  [] animation

- [] TextField
  [x] Basic properties
  [x] TextEditingController
  [] InputDecoration (partially)
  [] TextStyle

- [x] Checkbox
      [x] Basic
      [] Style

- [x] ReordableListView

## WIP

- [] GestureDetecture
  [x] click
  [] tap
  [] swipes
  [] hover

- [] Container
  [x] Border
  [x] BorderRadius
  [x] Color
  [x] Shadow
  [] Margin
  [x] Padding
  [] Color Opacity ? Border Color Opacity
  [] Shape
  [] Gradient
  [] Alignment
  [] Image
  [x] Height
  [x] Width

- [] Material
- [] InkWell
- [] Colors
  [x] White, black
  [] Color palette

- [] Scaffold
  [x] Drawer
  [x] AppBar

- [] Drawer
  [x] basic
  [] animation

- [] AppBar
  [x] basic

## Next

- [] Flexible
- [] OutlinedButton
- [] Ripple
- [] Progress
- [] Card
- [] Icon
- [] IconButton
- [] Bar
- [] ButtonBar
- [] ListView, ListView.separeted
- [] Object Fit - FitBox?, FittedBox?

# Current Problems:

- [] Tailwind included as package, but needs to be included to main.ts(js) when this package added. Maybe it's a wrong way..
- [] Sizes cannot be set as numbers.

# Changelog

Changelog can be found in [Releases](https://github.com/xsoulspace/vuefer/releases)

# Setup with Vue 3 + Typescript + Vite

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette 5. Search and run "Select TypeScript version" -> "Use workspace version"
