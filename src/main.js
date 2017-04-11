// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex);
Vue.config.productionTip = false

// import tab1 from './components/zk-spinner/src/tab1.vue';
// import tab2 from './components/zk-spinner/src/tab2.vue';
// const routes = [
//   { path: '/tab1', component: tab1 },
//   { path: '/tab2', component: tab2 }
// ]
// const router = new VueRouter({
//   routes // （缩写）相当于 routes: routes
// });
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App}
})
