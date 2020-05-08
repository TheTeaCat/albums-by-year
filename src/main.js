import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
var router = new VueRouter({
  mode: 'history',
  routes: []
});

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: 'UA-165902876-1'
})

import "./plugins/fontawesome-vue";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
