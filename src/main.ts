/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
// Plugins
import { registerPlugins } from '@/plugins'


const pinia = createPinia()

const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.use(router)
app.mount('#app')
