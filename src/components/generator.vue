<template>
<div class="generator">
  <div class="on-top" :style="(progress === 0)?'display:none;':''">
    <md-progress class="md-accent" :md-progress="progress"></md-progress>
  </div>

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
import futch from './Futch.js'
import dataURItoBlob from './dataURItoBlob.js'
export default {
  name: 'generator',
  components: {
    GeneratorText
  },
  data() {
    return {
      stage: void 0,
      texts: [],
      progress: 0
    }
  },
  methods: {
    generate(e) {
      const
        DOMAIN = 'https://aliangliang.com.tw:8787/',
        form = new FormData()
      form.append('image', dataURItoBlob(this.stage.toDataURL()))
      this.progress = 0.000001
      futch(DOMAIN + 'generate', {
          method: 'POST',
          mode: 'cors',
          body: form
        }, (e) => {
          this.progress = e.loaded / e.total * 100
        })
        .then((text) => JSON.parse(text))
        .then((data) => {
          location.href = '#/product/' + data.id
        })
        .catch(function(error) {
          console.log('Request failed', error);
        });
    }
  },
  mounted() {
    console.log(this.$route)
    if (!this.$route.params.id)
      location.href = '#/'

    fetch('https://aliangliang.com.tw:8787/generator/' + this.$route.params.id, {
        method: 'get',
        mode: 'cors',
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const
          imageUrl = 'https://aliangliang.com.tw:8787/' + data.image,
          textsJSON = data.texts

        const imageObj = new Image()
        imageObj.crossOrigin = 'Anonymous'
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
      })
      .catch(function(error) {
        console.log('Request failed', error);
      });
  }
}
</script>

<style>
.thumbnail.active {
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 10px 20px;
  background-color: #eeeeee;
}

.on-top {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
</style>
