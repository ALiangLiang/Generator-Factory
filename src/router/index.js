import Vue from 'vue'
import Router from 'vue-router'
import VueMaterial from 'vue-material'
import index from '@/components/index'
// import Manufacture from '@/components/manufacture'
import Generator from '@/components/generator'
import Product from '@/components/product'
import GeneratorMenu from '@/components/generatorMenu'
import ProductMenu from '@/components/productMenu'

Vue.use(Router)
Vue.use(VueMaterial)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: index
  },
  // {
  //   path: '/manufacture',
  //   name: 'Manufacture',
  //   component: Manufacture,
  //   data: {
  //     image: void 0
  //   }
  // },
  {
    path: '/generator/:id',
    name: 'Generator',
    component: Generator
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/generatorMenu',
    name: 'GeneratorMenu',
    component: GeneratorMenu
  },
  {
    path: '/productMenu',
    name: 'ProductMenu',
    component: ProductMenu
  }
  ]
})
