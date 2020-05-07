import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
var router = new VueRouter({
  mode: 'history',
  routes: []
});

import Spotify from 'spotify-web-api-node'
import VueSpotify from 'vue-spotify'
Vue.use(VueSpotify, new Spotify())

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
