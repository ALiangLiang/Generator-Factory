<template>
<div>
  <md-layout md-gutter>
    <md-layout v-for="generator in generators" :key="generator.id" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
      <md-card>
        <md-card-media>
          <md-image :md-src="'https://aliangliang.com.tw:8787/' + generator.preview"></md-image>
          <md-ink-ripple></md-ink-ripple>
        </md-card-media>

        <md-card-actions>
          <md-button :href="'#/generator/' + generator.id">使用產生器</md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
  </md-layout>
</div>
</template>

<script>
export default {
  name: 'generatorMenu',
  data: function() {
    return {
      generators: []
    }
  },
  mounted() {
    fetch('https://www.aliangliang.com.tw:8787/generators/')
      .then((res) => res.json())
      .then((json) => this.generators = json)
  }
}
</script>

<style>

</style>
