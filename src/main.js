import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);
var router = new VueRouter({
  mode: "history",
  routes: [],
});

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config(60 * 60 * 24 * 365 * 10); //10 years

import "./plugins/fontawesome-vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
