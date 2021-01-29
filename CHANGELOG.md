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
