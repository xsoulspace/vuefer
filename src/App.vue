<template>
  <WrapperApp />
</template>
<script lang="ts">
import Vue from "vue";
import { wrapperApp } from "@/example/App";
export default {
  components: {
    WrapperApp: wrapperApp(),
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
