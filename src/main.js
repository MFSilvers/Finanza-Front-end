import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

// Log per verificare cache del browser
const APP_VERSION = Date.now()
console.log('🚀 App caricata - Versione:', APP_VERSION, 'Timestamp:', new Date().toISOString())
console.log('📍 URL:', window.location.href)
console.log('🔍 User Agent:', navigator.userAgent)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

console.log('✅ App montata correttamente - Versione:', APP_VERSION)
