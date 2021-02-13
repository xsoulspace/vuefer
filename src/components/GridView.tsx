import { computed, defineComponent, h, Ref } from 'vue'
import { Maybe, ValueChanged } from '../abstract/BasicTypes'
import { GridViewDelegate, GridViewItemPosition } from '../abstract/Grid'
import GridViewBuilder from './GridViewBuilder.vue'
interface GridViewBuilderI {
  crossAxisCount?: Ref<number>
  itemHeight?: Ref<Maybe<number>>
  isDraggable?: Ref<boolean>
  isResizable?: Ref<boolean>
  placeAnywhere?: Ref<boolean>
  delegate: GridViewDelegate
  onPositionUpdate?: Maybe<ValueChanged<GridViewItemPosition>>
}
/**
 * GridView provide a way to manage resized and draggable items
 *
 * Based on awesome: [vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout/v/3.0.0-beta1)
 *
 * Usage example:
 *
 * ```typescript
 * GridView.count({
 *    isDraggable: ref(true),
 *    isResizable: ref(true),
 *    onPositionUpdate: (newPosition) => {
 *      const i = layoutMatrix.findIndex(
 *        (el) => el.index == newPosition.index
 *      )
 *      layoutMatrix.splice(i, 1, newPosition)
 *    },
 *    delegate: GridViewDelegate.use({
 *      gridViewItems: layoutMatrix.map((el) =>
 *        GridViewItem({
 *          child: TextButton({
 *            child: Text({ text: ref(`text key:${el.index}`) }),
 *            expand: true,
 *            onTap: () => alert(`Hola ${el.index}!`),
 *          }),
 *          position: el,
 *        })
 *      ),
 *    }),
 *  })
 * ```
 */
export class GridView {
  static count({
    crossAxisCount,
    isDraggable,
    isResizable,
    itemHeight,
    delegate,
    onPositionUpdate,
    placeAnywhere,
  }: GridViewBuilderI) {
    return defineComponent({
      name: 'GridView',
      components: {
        GridViewBuilder,
      },
      setup() {
        const resolvedIsDraggable = computed(() =>
          isDraggable?.value == false ? false : true
        )
        const resolvedIsResizable = computed(() =>
          isResizable?.value == false ? false : true
        )
        const resolvedItemHeight = computed(() => itemHeight?.value ?? 30)
        const resolvedCrossAxisCount = computed(
          () => crossAxisCount?.value ?? 12
        )
        const resolvedPlaceAnywhere = computed(() =>
          placeAnywhere?.value == false ? false : true
        )
        const widgets = computed(() =>
          delegate.widgets.map((el) => h(el ?? <div />))
        )

        return () =>
          h(
            <grid-view-builder
              crossAxisCount={resolvedCrossAxisCount.value}
              isDraggable={resolvedIsDraggable.value}
              isResizable={resolvedIsResizable.value}
              itemHeight={resolvedItemHeight.value}
              placeAnywhere={resolvedPlaceAnywhere.value}
              delegate={delegate}
              onPositionUpdate={onPositionUpdate}
            >
              {...widgets.value}
            </grid-view-builder>
          )
      },
    })
  }
}
