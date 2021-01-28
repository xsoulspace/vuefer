<template>
  <WrapperApp />
</template>
<script lang="ts">
import { wrapperApp } from '@/example/App'
export default {
  components: {
    WrapperApp: wrapperApp(),
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
