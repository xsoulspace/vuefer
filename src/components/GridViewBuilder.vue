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
import { computed, reactive, watch } from 'vue'

import { GridViewItemBuilder } from './GridViewItemBuilder'
import {
  GridViewDelegate,
  GridViewItemPosition,
  PackageGridItemPosition,
} from '../abstract/Grid'
import { Maybe, ValueChanged } from '../abstract/BasicTypes'
import { getChangesFromOldAndNewArrays } from '@/functions'
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
    const internalLayoutMatrixMap = reactive<
      Map<PackageGridItemPosition['i'], PackageGridItemPosition>
    >(new Map())
    const changeIndexedMap = ({
      positionsToUpdate,
    }: {
      positionsToUpdate: PackageGridItemPosition[]
    }) => {
      const { created, updated, removed } = getChangesFromOldAndNewArrays({
        newArr: positionsToUpdate,
        oldArr: internalLayoutMatrix.value,
        idPropertyName: 'i',
      })
      for (const removedPosition of removed) {
        internalLayoutMatrixMap.delete(removedPosition.i)
      }
      for (const createdPosition of created.concat(updated)) {
        internalLayoutMatrixMap.set(createdPosition.i, createdPosition)
      }
    }

    const internalLayoutMatrix = computed({
      set: (positionsToUpdate) => changeIndexedMap({ positionsToUpdate }),
      get: () => [...internalLayoutMatrixMap.values()],
    })
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
    const itemBuilder = ({ index }) => props.delegate.itemBuilder({ index })
    watch(
      props.delegate.reactive,
      () => {
        const positionsToUpdate = props.delegate.layoutMatrix.map((el) => ({
          x: el.x,
          y: el.y,
          w: el.width,
          h: el.height,
          i: el.index,
        }))
        changeIndexedMap({ positionsToUpdate })
      },
      { deep: true, immediate: true }
    )
    return {
      internalLayoutMatrix,
      handleResized,
      itemBuilder,
      handleMoved,
    }
  },
}
</script>
