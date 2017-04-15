import Vue from 'vue'
import Router from 'vue-router'
import VueMaterial from 'vue-material'
import index from '@/components/index'
import Manufacture from '@/components/manufacture'
import Generator from '@/components/generator'
import Product from '@/components/product'

Vue.use(Router)
Vue.use(VueMaterial)

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
      path: '/generator/:id',
      name: 'Generator',
      component: Generator
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product
    }
  ]
})
