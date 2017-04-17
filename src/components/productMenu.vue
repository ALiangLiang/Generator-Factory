<template>
<md-layout :md-gutter="24">
  <md-layout v-for="product in products" :key="product.id" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
    <md-card md-with-hover>
      <md-card-media>
        <image-loader :src="product.imageSrc"></image-loader>
        <md-ink-ripple></md-ink-ripple>
      </md-card-media>

      <md-card-actions>
        <md-button :href="'/product/' + product.id">查看產品</md-button>
      </md-card-actions>
    </md-card>
  </md-layout>
</md-layout>
</template>

<script>
import ImageLoader from './ImageLoader.vue'
export default {
  name: 'ProductMenu',
  components: {
    ImageLoader
  },
  data: function() {
    return {
      products: []
    }
  },
  mounted() {
    fetch(DOMAIN + '/api/products/')
      .then((res) => res.json())
      .then((json) => this.products = json
        .map((product) => {
          product.imageSrc = DOMAIN + product.image
          return product
        }))
  }
}
</script>

<style>

</style>
