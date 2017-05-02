import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import  goods from "../components/goods/goods.vue";
import  seller from "../components/seller/seller.vue";
import  rating from "../components/rating/rating.vue";
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
      name: '',
      component:goods
    },
    {
      path: '/goods',
      name: 'goods',
      component:goods
    },
    {
      path: '/seller',
      name: 'seller',
      component:seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component:rating
    },
  ]
})
