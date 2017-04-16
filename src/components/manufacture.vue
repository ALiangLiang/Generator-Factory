<template>
<div class="manufacture">
  <div class="on-top" :style="(progress === 0)?'display:none;':''">
    <md-progress class="md-accent" :md-progress="progress"></md-progress>
  </div>

  <div id="container"></div>

  <md-button class="md-raised md-primary" @click.native="createTextbox">
    <md-icon @click="createTextbox">text_fields</md-icon>新增文字方塊
  </md-button>

  <md-button class="md-raised md-primary" @click.native="createGenerator">
    <md-icon>build</md-icon>製造產生器
  </md-button>

  <md-input-container>
    <label>縮放</label>
    <md-input type="number" v-model="scaleRate" @input="scale"></md-input>
  </md-input-container>

  <md-layout md-gutter="" md-align="center">
    <md-layout v-for="(text, i) in texts" md-flex="20" :key="i" md-row>
      <canvas-text :index="i" :text="text"></canvas-text>
    </md-layout>
  </md-layout>
</div>
</template>

<script>
import Konva from 'Konva'
import canvasText from './Text.vue'
import futch from './Futch.js'
import dataURItoBlob from './dataURItoBlob.js'
export default {
  name: 'manufacture',
  components: {
    canvasText
  },
  data: function() {
    return {
      stage: void 0,
      image: void 0,
      scaleRate: 1,
      texts: [],
      progress: 0
    }
  },
  methods: {
    scale(v) {
      if (Number(v) <= 0)
        return
      const image = this.stage.get('Image')[0]
      image.scaleX(v)
      image.scaleY(v)
      this.stage.width(image.width() * v)
      this.stage.height(image.height() * v)
      this.stage.draw()
    },
    changeText(action, i, v) {
      const text = this.texts[i]
      console.log(text)
      text[action](v)
      text.getLayer().draw()
    },
    createTextbox(e) {
      const textLayer = new Konva.Layer()
      const text = new Konva.Text({
        x: 0,
        y: 0,
        text: '在非洲\n每六十秒\n就有一分鐘過去',
        fontSize: 30,
        fontFamily: 'cwTeXHei',
        fill: 'black',
        shadowColor: 'black',
        shadowBlur: 30,
        shadowOffset: [10, 10],
        shadowOpacity: 0.5,
        draggable: true
      })
      text.on('dragmove', function() {

      })
      textLayer.add(text)
      this.stage.add(textLayer)
      this.texts.push(text)
      textLayer.draw()
    },
    createGenerator(e) {
      const image = this.stage.get('Image')[0]
      image.width(image.width() * image.scaleX())
      image.height(image.height() * image.scaleY())
      image.scale({
        x: 1,
        y: 1
      })

      const
        DOMAIN = 'https://aliangliang.com.tw:8787/',
        form = new FormData()
      form.append('image', dataURItoBlob(image.toDataURL()))
      form.append('preview', dataURItoBlob(this.stage.toDataURL()))
      form.append('texts', JSON.stringify(this.texts.map((text) => text.toJSON())))
      this.progress = 0.000001
      futch(DOMAIN + 'manufacture', {
          method: 'POST',
          mode: 'cors',
          body: form
        }, (e) => this.progress = e.loaded / e.total * 100)
        .then((text) => JSON.parse(text))
        .then((data) => {
          location.href = '#/generator/' + data.id
        })
        .catch(function(error) {
          console.log('Request failed', error);
        });
    }
  },
  mounted() {
    const imageObj = this.$router.image
    if (!imageObj) {
      location.href = '#/'
    }
    const
      texts = this.texts,
      maxWidth = 960

    const
      image = new Konva.Image({
        image: imageObj
      }),
      imageLayer = new Konva.Layer(),
      size = image.size(),
      stage = this.stage = new Konva.Stage({
        container: 'container'
      })
    if (image.width() > maxWidth)
      image.scale({
        x: maxWidth / image.width(),
        y: maxWidth / image.width()
      })
    this.scaleRate = image.scale().x
    stage.size(image.getClientRect())
    imageLayer.add(image)
    stage.add(imageLayer)
    imageLayer.draw()
  }
}
</script>

<style>
.konvajs-content {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.on-top {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
</style>
