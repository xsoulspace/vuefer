<template>
  <wrapperApp />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { wrapperApp } from "@/example/App";
@Options({
  components: {
    wrapperApp: wrapperApp(),
  },
})
export default class Home extends Vue {}
</script>
