<template>
<v-container fluid="fluid">
  <v-card class="ma-5" v-for="generator in generators" :key="generator.id" hover>
    <v-card-row :class="generator.mainColor">
      <v-card-title>
        <span class="white--text">{{generator.name}}</span>
      </v-card-title>
    </v-card-row>
    <v-card-row :img="generator.previerSrc" height="300px"></v-card-row>
    <v-card-text class="blue-grey darken-3 white--text">
      <div v-text="generator.description"></div>
    </v-card-text>
    <v-card-row actions :class="generator.mainColor + ' mt-0'">
      <v-btn tag="a" :href="'/generator/' + generator.id" flat class="white--text">
        <v-icon>create</v-icon>使用產生器
      </v-btn>
    </v-card-row>
  </v-card>
</v-container>
</template>

<script>
import mdColors from './md-colors.json'
import nearestColor from './nearestColor.js'
export default {
  name: 'generatorMenu',
  data: function() {
    return {
      generators: []
    }
  },
  mounted() {
    const colorThief = new ColorThief()

    fetch(DOMAIN + '/api/generators/')
      .then((res) => res.json())
      .then((json) => this.generators = json
        .map((generator) => {
          generator.previerSrc = DOMAIN + generator.preview
          generator.mainColor = ''
          const img = new Image
          img.crossOrigin = 'Anonymous'
          img.onload = () => {
            const color = '#' + colorThief.getPalette(img)[0]
              .map((n) => n.toString(16)).join('')
            generator.mainColor = nearestColor(color, nearestColor.mapColors(mdColors)).name
          }
          img.src = generator.previerSrc
          return generator
        }))
  }
}
</script>

<style>

</style>
