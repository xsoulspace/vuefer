import { computed, defineComponent, h, ref, Ref, watch } from 'vue'
import { GridLayout } from 'vue-grid-layout'
import { GridViewController, GridViewItemPosition, Maybe } from '..'

interface GridViewBuilderI {
  crossAxisCount: Ref<number>
  itemHeight?: Ref<Maybe<number>>
  isDraggable?: Ref<boolean>
  isResizable?: Ref<boolean>
  controller: GridViewController
}
export class GridView {
  static count({
    crossAxisCount,
    isDraggable,
    isResizable,
    itemHeight,
    controller,
  }: GridViewBuilderI) {
    const resolvedIsDraggable = computed(() =>
      isDraggable?.value == false ? false : true
    )
    const resolvedIsResizable = computed(() =>
      isResizable?.value == false ? false : true
    )
    const resolvedItemHeight = computed(() => itemHeight?.value ?? 30)
    const internalLayoutMatrix = ref<Maybe<GridViewItemPosition>[]>([])
    watch(
      controller.reactive,
      () => {
        internalLayoutMatrix.value = controller.layoutMatrix
      },
      { deep: true, immediate: true }
    )
    return defineComponent({
      name: 'GridView',
      setup() {
        return { crossAxisCount }
      },
      render() {
        return h(
          GridLayout,
          {
            'col-num': crossAxisCount.value,
            'row-height': resolvedItemHeight.value,
            'is-draggable': resolvedIsDraggable.value,
            'is-resizable': resolvedIsResizable.value,
            'vertical-compact': true,
            'use-css-transforms': true,
            // FIXME: maybe there needed to fix null values...
            layoutValue: internalLayoutMatrix.value,
            'onUpdate:layoutValue': (matrix) =>
              (internalLayoutMatrix.value = matrix),
          },
          controller.widgets.map((el) => h(el ?? <div />))
        )
      },
    })
  }
}
