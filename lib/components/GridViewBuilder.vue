<template>
  <grid-layout
    style="width: 100%; height: 100%"
    :col-num="crossAxisCount"
    :row-height="itemHeight"
    :is-draggable="isDraggable"
    :is-resizable="isResizable"
    :vertical-compact="!placeAnywhere"
    :use-css-transforms="true"
    v-model:layout="internalLayoutMatrix"
  >
    <grid-item
      v-for="item in internalLayoutMatrix"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      @resized="(i, h, w) => handleResized(i, h, w, item)"
      @moved="(i, x, y) => handleMoved(i, x, y, item)"
    >
      <grid-view-item-builder :index="item.i" :itemBuilder="itemBuilder" />
    </grid-item>
  </grid-layout>
</template>
<script lang="ts">
  import { computed, reactive, ref, watch } from 'vue'

  import { GridViewItemBuilder } from './GridViewItemBuilder'
  import {
    GridViewDelegate,
    GridViewItemPosition,
    PackageGridItemPosition,
  } from '../abstract/Grid'
  import { Maybe, ValueChanged } from '../abstract/BasicTypes'
  import { getChangesFromOldAndNewArrays } from '../functions'

  type PackageGridItemPositionIndex = number

  export default {
    name: 'GridViewBuilder',
    props: {
      isDraggable: {
        type: Boolean,
        required: true,
      },
      isResizable: {
        type: Boolean,
        required: true,
      },
      itemHeight: {
        type: Number,
        required: true,
      },
      placeAnywhere: {
        type: Boolean,
        required: true,
      },
      delegate: {
        type: GridViewDelegate,
        required: true,
      },
      crossAxisCount: {
        type: Number,
        required: true,
      },
      onPositionUpdate: {
        type: Function,
        required: false,
      },
    },
    components: {
      GridViewItemBuilder,
    },
    setup(props) {
      /**
       * This an persistent matrix which always up to date and synced
       * with vue-grid. AllChanges must go on from it or be written to it.
       */
      const internalLayoutMatrix = reactive<PackageGridItemPosition[]>([])
      /**
       * Sending changes up
       */
      const fixedTypeOnPositionUpdate = props.onPositionUpdate as Maybe<
        ValueChanged<GridViewItemPosition>
      >
      const handleResized = async (
        index: GridViewItemPosition['index'],
        newHeight: GridViewItemPosition['height'],
        newWidth: GridViewItemPosition['width'],
        position: PackageGridItemPosition
      ) => {
        const newPosition = GridViewItemPosition.fromPackageGridItemPosition({
          position,
        })
        newPosition.height = newHeight
        newPosition.width = newWidth
        if (fixedTypeOnPositionUpdate)
          await fixedTypeOnPositionUpdate(newPosition)
      }
      const handleMoved = async (
        index: GridViewItemPosition['index'],
        newX: GridViewItemPosition['x'],
        newY: GridViewItemPosition['y'],
        position: PackageGridItemPosition
      ) => {
        const newPosition = GridViewItemPosition.fromPackageGridItemPosition({
          position,
        })
        newPosition.x = newX
        newPosition.y = newY
        if (fixedTypeOnPositionUpdate)
          await fixedTypeOnPositionUpdate(newPosition)
      }

      /**
       * Getting changes down
       * 1. Watch for changes in delegate.
       * If its changes, run items check.
       * 2. If items is changed, then change interfnal matrix
       */

      const internalLayoutMapOfIndexes = computed(() => {
        const map = new Map<
          PackageGridItemPosition['i'],
          PackageGridItemPositionIndex
        >()
        for (let i = 0; i < internalLayoutMatrix.length; i++) {
          const position = internalLayoutMatrix[i]
          map.set(position.i, i)
        }
        return map
      })
      const changeIndexedMap = ({
        newArr,
      }: {
        newArr: PackageGridItemPosition[]
      }) => {
        const { created, updated, removed } = getChangesFromOldAndNewArrays({
          newArr,
          oldArr: internalLayoutMatrix,
          idPropertyName: 'i',
        })
        for (const removedPosition of removed) {
          const index = internalLayoutMapOfIndexes.value.get(removedPosition.i)
          if (index) internalLayoutMatrix.splice(index, 1)
        }
        for (const updatedPosition of updated) {
          const index = internalLayoutMapOfIndexes.value.get(updatedPosition.i)

          if (index) {
            const oldPosition = internalLayoutMatrix[index]
            oldPosition.x = updatedPosition.x
            oldPosition.y = updatedPosition.y
            oldPosition.w = updatedPosition.w
            oldPosition.h = updatedPosition.h
          }
        }
        for (const createdPosition of created) {
          internalLayoutMatrix.push(createdPosition)
        }
      }

      watch(
        props.delegate.reactive,
        () => {
          const newArr = props.delegate.layoutMatrix.map((el) => ({
            x: el.x,
            y: el.y,
            w: el.width,
            h: el.height,
            i: el.index,
          }))
          changeIndexedMap({ newArr })
        },
        { deep: true, immediate: true }
      )
      const itemBuilder = ({ index }) => props.delegate.itemBuilder({ index })

      return {
        internalLayoutMatrix,
        handleResized,
        itemBuilder,
        handleMoved,
      }
    },
  }
</script>
