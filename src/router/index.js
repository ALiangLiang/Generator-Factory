import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons/iconfont/material-icons.css'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'
import index from '@/components/index'
// import Manufacture from '@/components/manufacture'
import Generator from '@/components/generator'
import Product from '@/components/product'
import GeneratorMenu from '@/components/generatorMenu'
import ProductMenu from '@/components/productMenu'

window.DOMAIN = 'http://factory.aliangliang.com.tw'
Vue.use(Vuetify)
// Vue.use(VueMaterial)
Vue.use(Router)

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
