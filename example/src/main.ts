import { createApp } from 'vue'
import vueGridLayout from 'vue-grid-layout'
import '../../lib/index.scss'
// import '../../lib/tailwind.css'
import { AppProvider } from './AppProvider'

createApp(AppProvider).use(vueGridLayout).mount('#app')
