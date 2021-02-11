import { computed, defineComponent, h, Ref } from 'vue'
import { GridViewDelegate, GridViewItemPosition, Maybe, ValueChanged } from '..'
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
