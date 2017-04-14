<template>
<div class="generator">
  <div id="container"></div>

  <md-button class="md-raised md-primary" @click.native="generate">
    <md-icon>create</md-icon>產生圖文
  </md-button>

  <div class="row">
    <generator-text v-for="(text, i) in texts" :key="i" :index="i" :text="text"></generator-text>
  </div>
</div>
</template>

<script>
import GeneratorText from './Generator_Text.vue'
export default {
  name: 'generator',
  components: {
    GeneratorText
  },
  data() {
    return {
      stage: void 0,
      texts: []
    }
  },
  methods: {
    generate(e) {
      this.$router.product = {}
      this.$router.product.imageUrl = this.stage.toDataURL()
      location.href = '#/product'
    }
  },
  mounted() {
    if (!this.$router.generator)
      location.href = '#/'
    const
      imageUrl = this.$router.generator.imageUrl,
      textsJSON = this.$router.generator.textsJSON

    const imageObj = new Image()
    imageObj.onload = () => {
      const imageLayer = new Konva.Layer()
      const image = new Konva.Image({
        image: imageObj
      })
      imageLayer.add(image)

      const stage = this.stage = new Konva.Stage({
        container: 'container',
      })
      console.log(image.size())
      stage.size(image.size())
      stage.add(imageLayer)

      textsJSON.forEach((textJSON) => {
        const textLayer = new Konva.Layer()
        const text = Konva.Node.create(textJSON)
        text.draggable(false)
        this.texts.push(text)
        textLayer.add(text)
        this.stage.add(textLayer)
      })

      stage.draw()
    }
    imageObj.src = imageUrl
  }
}
</script>

<style>
.thumbnail.active {
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 10px 20px;
  background-color: #eeeeee;
}
</style>
