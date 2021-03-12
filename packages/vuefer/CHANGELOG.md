## 0.9.0

feat: ReordableListView based on awesome [vue-draggable-next](https://github.com/anish2690/vue-draggable-next)

First add ReordableListViewDelegate with items

```typescript
const reordableDelegate = ReordableListViewDelegate.use({
  gridViewItems: [],
});
onMounted(() => {
  for (const el of layoutMatrix.value) {
    reordableDelegate.addUpdate(
      GridViewItem({
        child: TextButton({
          child: Text({
            text: ref(`text key  ljsdl f:${el.index}`),
          }),
          expand: true,
          onTap: () => alert(`Hola ${el.index}!`),
        }),
        position: el,
      })
    );
  }
});
```

Then use it in tree

```typescript
ReordableListView({
  delegate: reordableDelegate,
  isDraggable,
  onReorder: ({ newIndex, position }) => {
    console.log({ newIndex, position });
    const newPosition = position;
    newPosition.position.y = newIndex;
    const i = layoutMatrix.value.findIndex(
      (el) => el.index == newPosition?.position.index
    );
    if (i && newIndex != null) {
      if (newPosition) {
        layoutMatrix.value.splice(i, 1, newPosition.position);
        return;
      }
    }
    layoutMatrix.value.splice(i, 1);
  },
});
```

feat: temporary in some components where added \_debugClasses to test Tailwind css. All these properties will be removed later.

## 0.8.0

BREAKING CHANGE: Now package name is `Vuefer`. `vue_flutter_tailwind` will be deprecated as it will reach stable version.
BREAKING CHANGE: Webpack replaced with Vite
BREAKING CHANGE: `MultiProvider.create` replaced to `MultiProvider.build`
BREAKING CHANGE: `Scaffold({})` now builds as `Scaffold.build({})`
BREAKING CHANGE: `Alignment.toOverlay` no is `Alignment.overlay`

feat: Navigation push now can align Dialog(route) window
feat: Drawer
feat: AppBar
feat: Scaffold now has drawer and appBar

To use Drawer you must first initialize somewhere above `Navigation` with `NavigationContorller` as below:

```typescript
MultiProvider.build({
  models: [NavigationController],
  child: Navigation({
    child: ...,
  }),
})
```

To open Drawer use
`Scaffold.openDrawer()`
To close Drawer use
`Scaffold.closeDrawer()`

```typescript
Scaffold.build({
  drawer: Drawer({
    child: Column({
      children: [
        Text({
          text: ref("Drawer header"),
        }),
      ],
    }),
  }),
  appBar: AppBar({
    leading: ElevatedButton({
      child: Text({
        text: ref("="),
      }),
      onTap: () => {
        Scaffold.openDrawer();
      },
    }),
    title: Text({
      text: ref("Title"),
    }),
    actions: [
      ElevatedButton({
        child: Text({
          text: ref("a"),
        }),
      }),
      ElevatedButton({
        child: Text({
          text: ref("b"),
        }),
      }),
      ElevatedButton({
        child: Text({
          text: ref("c"),
        }),
      }),
    ],
  }),
  body: Home(),
});
```

## 0.7.0

### feat: MultiDropdownButton

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

## 0.6.0

### feat: Provider

Uses provide/inject under the hood

#### Usage

Let's suppose we have a model:

```typescript
export class Hero {
  constructor(public name: string) {}
}
export class HeroesModel {
  heroes = reactive<Maybe<Hero>[]>([]);
  add(hero: Hero) {
    this.heroes.push(hero);
  }
  get count() {
    return this.heroes.length;
  }
}
```

Create Provider on top of tree

```typescript
MultiProvider.create({
  models: [HeroesModel],
  child: wrapperApp(),
});
```

And somewhere in tree just call

```typescript
const heroModel = MultiProvider.get<HeroesModel>(HeroesModel);
```

### feat: Dialog

Popup functionality with support via Navigation

#### Usage

First - get NavigationController in setup

Be sure that you have Navigation widget on top of tree

```typescript
const navigationController = MultiProvider.get<NavigationController>(
  NavigationController
);
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

### feat: Navigator

Used to manage:

- Popup (with background) functionality
- Fullscreen functionality routes (not tested yet)

### feat: a little explanation for GridView

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
      const value = obj.value[index];
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
      });
    },
    itemCount: itemCount,
  }),
  height: new SizedBoxHeight({
    height: EdgeInsetsStep.s60,
  }),
  width: new SizedBoxWidth({
    width: EdgeInsetsStep.s96,
  }),
});
```

## 0.2.1

Add: Text Widget, FontWeight, TextDecoration, TextStyle, TextAlign, TextOverflow, FontSize

## 0.1.1

Add: declarations files
