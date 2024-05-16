// main.js

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import router from './router'

// Create the app instance
const app = createApp(App)

// Register plugins
registerPlugins(app)


// Use router and mount the app
app.use(router)
app.mount('#app')
