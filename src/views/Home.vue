<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <wrapperApp />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { wrapperApp } from "@/components/App";
@Options({
  components: {
    wrapperApp: wrapperApp(),
  },
})
export default class Home extends Vue {}
</script>
