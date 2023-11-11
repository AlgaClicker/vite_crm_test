import { createApp } from 'vue'
import App from './App.vue'


import router from './router';
import store from './store';
import axios from 'axios';
import io from 'socket.io-client'
import * as Popper from '@popperjs/core'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas,far,fab)




import './style.css'
window.io = io;
window.Popper = Popper

const app = createApp(App)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon, {})
app.use(router)
app.mount('#app')