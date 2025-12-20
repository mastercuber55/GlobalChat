import './assets/pico.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerSW } from "virtual:pwa-register"

const updateSW = registerSW({
  onNeedRefresh() {
    alert("New service worker available ")
    updateSW()
  },
  onOfflineReady() {
    console.log('App ready to work offline!')
  }
})

const app = createApp(App)

app.use(router)

app.mount('#app')
