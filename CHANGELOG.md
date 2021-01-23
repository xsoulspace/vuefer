## 0.3.0

Add: ElevatedButton, TextButton, OpacityDecoration, Opacity Widget
Add: SizedBox
Add: ListView.builder with awesome (vue3-virtual-scroller!)[https://www.npmjs.com/package/vue3-virtual-scroller] which can be used in Flutter style now. ListView must be used inside SizedBox

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

## 0.2.0

Add: Text Widget, FontWeight, TextDecoration, TextStyle, TextAlign, TextOverflow, FontSize

## 0.1.1

Add: declarations files
