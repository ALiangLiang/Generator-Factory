<template>
<div>
  <md-layout :md-gutter="24">
    <md-layout v-for="generator in generators" :key="generator.id" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
      <md-card md-with-hover>
        <md-card-header>
          <div class="md-title">{{generator.name}}</div>
          <div class="md-subhead">{{generator.description}}</div>
        </md-card-header>

        <md-card-media>
          <image-loader :src="generator.previerSrc"></image-loader>
          <md-ink-ripple></md-ink-ripple>
        </md-card-media>

        <md-card-actions>
          <md-button :href="'/generator/' + generator.id">
            <md-icon>create</md-icon>
            使用產生器
          </md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
  </md-layout>
</div>
</template>

<script>
import ImageLoader from './ImageLoader.vue'
export default {
  name: 'generatorMenu',
  components: {
    ImageLoader
  },
  data: function() {
    return {
      generators: []
    }
  },
  mounted() {
    fetch(DOMAIN + '/api/generators/')
      .then((res) => res.json())
      .then((json) => this.generators = json
        .map((generator) => {
          generator.previerSrc = DOMAIN + generator.preview
          return generator
        }))
  }
}
</script>

<style>

</style>
