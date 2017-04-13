<template>
<div class="manufacture">
  <div id="container"></div>

  <button id="createTextboxBtn" type="button" class="btn btn-primary" @click="createTextbox">
    <i class="material-icons">text_fields</i>新增文字方塊
  </button>

  <button id="createGenerator" type="button" class="btn btn-success" @click="createGenerator">
    <i class="material-icons">build</i>製造產生器
  </button>

  <!-- <label for="width">寬度</label>
  <input id="width" class="form-control" type="text"> -->

  <div id="setting-list">
    <div class="row">
      <canvas-text v-for="(text, i) in texts" :key="i" :index="i" :text="text"></canvas-text>
    </div>
  </div>
</div>
</template>

<script>
import canvasText from './Text.vue'
export default {
  name: 'manufacture',
  components: {
    canvasText
  },
  data: function() {
    return {
      stage: void 0,
      image: void 0,
      texts: []
    }
  },
  methods: {
    changeText(action, i, v) {
      const text = this.texts[i]
      text[action](v)
      text.getLayer().draw()
    },
    createTextbox(e) {
      const textLayer = new Konva.Layer()
      const text = new Konva.Text({
        x: 0,
        y: 0,
        text: '測試文字1\n測試文字2\n測試文字3',
        fontSize: 30,
        fontFamily: 'Calibri',
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
      this.$router.generator = {}
      this.$router.generator.imageUrl = this.stage.get('Image')[0].toDataURL()

      this.$router.generator.textsJSON = this.texts.map((text) => text.toJSON())

      location.href = '#/generator'
    }
  },
  mounted() {
    const imageObj = this.$router.image
    if (!imageObj) {
      location.href = '#/'
    }
    const texts = this.texts

    const
      image = new Konva.Image({
        image: imageObj
      }),
      imageLayer = new Konva.Layer(),
      size = image.size(),
      stage = this.stage = new Konva.Stage({
        container: 'container'
      })
    console.log(image.size())
    stage.size(image.size())
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
</style>
