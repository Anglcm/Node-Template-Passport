// Components
import App from './App.vue'
import bootstrap from '../src/bootstrap';
import store from './store';

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import router from './router/router';


const app = createApp(App)

registerPlugins(app)

app.use(router);
app.use(bootstrap);
app.use(store);

app.mount('#app')
