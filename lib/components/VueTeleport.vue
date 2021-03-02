<template>
  <teleport :to="to">
    <slot />
  </teleport>
</template>
<script lang="ts">
  export default {
    name: 'VueTeleport',
    props: {
      to: {
        type: String,
        required: true,
      },
    },
  }
</script>
