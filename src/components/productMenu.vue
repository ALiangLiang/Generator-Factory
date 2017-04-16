<template>
<md-layout md-gutter>
  <md-layout v-for="product in products" :key="product.id" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
    <md-card>
      <md-card-media>
        <md-image :md-src="'https://aliangliang.com.tw:8787/' + product.image"></md-image>
        <md-ink-ripple></md-ink-ripple>
      </md-card-media>

      <md-card-actions>
        <md-button :href="'#/product/' + product.id">查看產品</md-button>
      </md-card-actions>
    </md-card>
  </md-layout>
</md-layout>
</template>

<script>
export default {
  name: 'ProductMenu',
  data: function() {
    return {
      products: []
    }
  },
  mounted() {
    fetch('https://www.aliangliang.com.tw:8787/products/')
      .then((res) => res.json())
      .then((json) => this.products = json)
  }
}
</script>

<style>

</style>
