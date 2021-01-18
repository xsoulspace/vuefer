<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
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
