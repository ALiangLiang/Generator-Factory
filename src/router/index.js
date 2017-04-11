import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Manufacture from '@/components/manufacture'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/manufacture',
    name: 'Manufacture',
    component: Manufacture
  }
  ]
})
