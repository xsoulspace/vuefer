declare module 'vue-grid-layout' {
  import type { DefineComponent } from 'vue'
  const GridItem: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >
  const GridLayout: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >
  export { GridItem, GridLayout }
}
