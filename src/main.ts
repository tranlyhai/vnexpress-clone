import './styles/input.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axiosPlugin from '@/plugins/axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(axiosPlugin, { router })

app.mount('#app')
