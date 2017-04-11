import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import tab1 from '@/components/zk-spinner/src/tab1.vue';
import tab2 from '@/components/zk-spinner/src/tab2.vue';
import data from '@/components/zk-spinner/src/data.vue';
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/tab1',
      name: 'tab1',
      component: tab1
    },
    {
      path: '/tab2',
      name: 'tab2',
      component: tab2
    },
    {
      path: '/data',
      name: 'data',
      component: data
    }
  ]
})
