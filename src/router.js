import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Error from '@/views/Error.vue'
import CoinDetail from '@/views/CoinDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', 
  routes: [
    {
      path: '/',
      name: 'home', 
      component: Home
    }, 
    {
      path: '/about',
      name: 'about', 
      component: About
    },
    {
      path: '/coin/:id', 
      name: 'coin-detail', 
      component: CoinDetail
    },
    {
      path: '*',
      name: 'error', 
      component: Error
    }
  ]
})