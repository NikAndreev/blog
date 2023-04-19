import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import axios from 'axios'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
}) 

const app = createApp(App)

app.use(store).use(router).use(vuetify)

app.mount('#app')

axios.defaults.baseURL = 'http://localhost:3001'

axios.interceptors.response.use(function (response) {
  // if (response.config.method !== 'get') {
  //   alert('Изменения сохранены!')
  // }

  return response

}, function (error) {
  alert(error.message || 'Что-то пошло не так. Попробуйте перезагрузить страницу.')

  return Promise.reject(error)
});
