/// <reference path="./types.d.ts" />
export * from './abstract'
export * from './components'
// thanks to How to build:
// https://forum.vuejs.org/t/vue-cli-library-build-error/86075/4
// https://itnext.io/create-a-vue-js-component-library-as-a-module-part-1-a1116e632751
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import './components/index.scss'
import './tailwind.css'
