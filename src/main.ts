import { createApp } from 'vue'
import vueGridLayout from 'vue-grid-layout'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import './components/index.scss'
import { AppProvider } from './example/AppProvider'
import './tailwind.css'

createApp(AppProvider).use(vueGridLayout).mount('#app')
