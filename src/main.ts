import { createApp } from 'vue'
import vueGridLayout from 'vue-grid-layout'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import './components/index.scss'
import App from './example/App.vue'
import './tailwind.css'

createApp(App).use(vueGridLayout).mount('#app')
