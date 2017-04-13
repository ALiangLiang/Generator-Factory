import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Manufacture from '@/components/manufacture'
import Generator from '@/components/generator'

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
    component: Manufacture,
    data: {
      image: void 0
    }
  },
  {
    path: '/generator',
    name: 'Generator',
    component: Generator
  }
  ]
})
