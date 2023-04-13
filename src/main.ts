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

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faCompactDisc, faDisplay, faCamera } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faCompactDisc, faDisplay, faCamera)

const pinia = createPinia()

const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
