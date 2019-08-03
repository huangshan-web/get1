import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

import VueTouch from 'vue-touch'        
Vue.use(VueTouch, {name: 'v-touch'})       
VueTouch.config.swipe = {threshold:100}

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import MintUI from '../node_modules/mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import axios from './axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
