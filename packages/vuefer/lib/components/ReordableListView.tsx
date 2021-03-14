import { computed, defineComponent, h, Ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { Maybe } from '../abstract/BasicTypes'
import { GridViewItemPosition } from '../abstract/Grid'
import { ReordableListViewDelegate } from '../abstract/ReordableListViewDelegate'
type ReorderCallback<TPosition extends GridViewItemPosition> = (reorder: {
  oldIndex: number
  newIndex: number
  position: TPosition
}) => void

interface ReordableListViewI<TPosition extends GridViewItemPosition> {
  onReorder?: Maybe<ReorderCallback<TPosition>>
  delegate: ReordableListViewDelegate<TPosition>
  isDraggable?: Ref<boolean>
  _debugClasses?: Maybe<string>
}
/**
 * 
 *
 *  First add ReordableListViewDelegate with items

    ```typescript

    type GenericGridViewItemPosition = {
      id: number;
      x: number;
      y: number;
      width: number;
      height: number;
      index: number;
    };

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

  * Then use it in tree

    ```typescript
    ReordableListView<GenericGridViewItemPosition>({
      delegate: reordableDelegate,
      isDraggable,
      onReorder: ({ newIndex, position }) => {
        console.log({ newIndex, position });
        const newPosition = position;
        const i = layoutMatrix.value.findIndex(
          (el) => el.index == newPosition?.index
        );
        if (i && newIndex != null) {
          if (newPosition) {
            layoutMatrix.value.splice(i, 1, position);
            return;
          }
        }
        layoutMatrix.value.splice(i, 1);
      },
    });
    ```
 * Thanks to:
 * This component based on
 * https://github.com/anish2690/vue-draggable-next
 * @param param0
 * @returns
 */
export const ReordableListView = <TPosition extends GridViewItemPosition>({
  onReorder,
  delegate,
  isDraggable,
  _debugClasses,
}: ReordableListViewI<TPosition>) => {
  return defineComponent({
    components: {
      VueDraggableNext,
    },
    name: 'ReordableListView',
    setup() {
      const resolvedIsDraggable = computed(() =>
        isDraggable?.value === false ? false : true
      )
      return () =>
        // see more https://github.com/SortableJS/Sortable#event-object-demo
        // https://github.com/anish2690/vue-draggable-next
        resolvedIsDraggable.value
          ? h(
              <vue-draggable-next
                list={delegate.reactVal}
                animation="200"
                ghost-class="ghost-card"
                onChange={async ({
                  moved: { oldIndex, element, newIndex },
                }: {
                  moved: {
                    element: TPosition
                    oldIndex: number
                    newIndex: number
                  }
                }) =>
                  onReorder
                    ? await onReorder({
                        oldIndex,
                        position: element,
                        newIndex,
                      })
                    : ''
                }
              >
                {...delegate.reactVal.map((el) => h(el.widget))}
              </vue-draggable-next>
            )
          : h(
              <div class={[_debugClasses, 'flex flex-col']}>
                {...delegate.sortedReactVal.map((el) => h(el.widget))}
              </div>
            )
    },
  })
}
