# Vue3 styled like Flutter with Tailwind CSS

**Please notice: this project is a work in progress!**

The reason & motivation why this project have been started is a question: Flutter & Dart awesome! Vue3 & Typescript & Tailwind awesome too!

But...

Flutter is not working inside Excel:( and its kind of complicated to work with web libraries.

So, what if we will write Vue3 TS in style of Flutter, because it's just simplier and faster?

Please notice:

- It is **not** a Flutter **at all** and even close, but hopefully will be use its style of components & methods writing.
- It is **not** properly written **at all** and cannot be used in production until release 1.
- All is **subject to change** until release 1.
- If you like this project - contributing &|| star is very welcome and appreciated and will keep development running Open Source and free:)

### Installation

Add this package to your package.json file:

```json
"dependencies": {
  "@xsoulspace/vue_flutter_tailwind": "^0.1.0"
}
```

add styling to your main.ts

```typescript
import "vue_flutter_tailwind/dist/vft.css";
```

### Usage

```typescript
export const wrapperApp = () => {
  const text = ref("Hello world!");
  const text2 = ref(2);
  const padding = EdgeInsets.all(EdgeInsetsStep.s3);

  const textCard = Padding({
    child: Text({
      text,
    }),
    padding,
  });

  const btn = ElevatedButton({
    child: Text({ text: ref("Hello Button") }),
    onPressed: () => {
      text2.value++;
      text.value = `Hello Wolrd! Counter: ${text2.value}`;
    },
  });

  return Scaffold({
    body: Align({
      toOverlay: true,
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
  });
};
```

# Roadmap

- [x] Alignment, Align, Center
- [] Object Fit - FitBox?, FittedBox?
- [x] Padding
- [x] Margin
- [] Container

- [x] Border
- [x] BorderRadius
- [x] Color
- [] Color Opacity ? Border Color Opacity
- [] Shape
- [x] Shadow
- [] Gradient
- [] Alignment
- [] Image

- [x] Flex
- [x] ? - Row (Flex -> row)
- [x] ? - Column (Flex -> column)
- [x] DividerDecoration (only for Row, Column)
- [] ? - Drawer
- [] ? - Provider, MultiProvider
- [] ? - SizedBox
- [] AutoSelect - DropdownButton, DropdownButtonItem
- [] ? - Progress
- [] ? - Card
- [] ? - ListView, ListView.builder, ListView.separeted
- [] ? - Scaffold
- [] AppBar
- [] Dialog(?)
- [] Icon
- [] IconButton
- [] Elevated Button
- [] Bar
- [] ButtonBar

- [] WIP - Text, TextStyle, TextDecoration, TextDecorationStyle
- [] WIP - ButtonStyleButton
- [] WIP - TextButton
- [x] MouseRegion
- [x] GestureDetecture
- [] WIP - ConstrainedBox
- [] WIP - Material
- [] WIP - InkWell

## Current Problems:

- [] it has no proper build, so installs whole node_modules
- [] Tailwind included as package, but needs to be included to main.ts(js) when this package added. Maybe it's a wrong way..
