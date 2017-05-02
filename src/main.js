// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from "vue-resource";
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex);
Vue.use(VueResource);
Vue.config.productionTip = false
const app = new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app');
