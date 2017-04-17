<template>
<div class="manufacture">
  <div class="on-top" :style="(progress === 0)?'display:none;':''">
    <md-progress class="md-accent" :md-progress="progress"></md-progress>
  </div>

  <md-layout md-gutter="16">
    <md-layout md-align="center" md-flex-xsmall="100" md-flex-small="100" md-flex-medium="60" md-flex-large="70">
      <div id="container"></div>

      <md-input-container :class="(name === '')?'md-input-invalid':''">
        <label>產生器名稱</label>
        <md-input type="text" v-model="name" required></md-input>
      </md-input-container>

      <md-input-container>
        <label>簡介</label>
        <md-textarea v-model="description"></md-textarea>
      </md-input-container>

      <md-checkbox v-model="isPrivate">不公開產生器 (只有擁有連結的人可以使用)</md-checkbox>

      <md-input-container>
        <label>縮放</label>
        <md-input type="number" v-model="scaleRate" @input="scale"></md-input>
      </md-input-container>

      <md-button class="md-raised md-primary" @click.native="createGenerator">
        <md-icon>build</md-icon>組裝產生器
      </md-button>
    </md-layout>

    <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="40" md-flex-large="30" md-column>
      <md-card>
        <md-layout md-gutter class="default-flex">
          <md-button class="md-raised md-primary" @click.native="createTextbox">
            <md-icon @click="createTextbox">text_fields</md-icon>新增文字方塊
          </md-button>
        </md-layout>

        <md-layout md-gutter class="default-flex">
          <md-tabs ref="textTabNavbar">
            <md-tab v-for="(text, i) in texts" :key="i" :md-label="'文字 ' + (i + 1)">
              <canvas-text :index="i" :text="text"></canvas-text>
            </md-tab>
          </md-tabs>
        </md-layout>
      </md-card>
    </md-layout>
  </md-layout>

  <md-snackbar md-position="bottom center" ref="snackbar" md-duration="4000">
    <span>{{snackbarText}}</span>
    <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
  </md-snackbar>
</div>
</template>

<script>
import Konva from 'konva'
import canvasText from './Text.vue'
import futch from './Futch.js'
import dataURItoBlob from './dataURItoBlob.js'
import uselessMottos from './UselessMottos.js'
export default {
  name: 'manufacture',
  components: {
    canvasText
  },
  props: ['image'],
  data() {
    return {
      MAX_WIDTH_HEIGHT: 960,
      stage: void 0,
      name: '',
      description: '',
      isPrivate: false,
      scaleRate: 1,
      texts: [],
      progress: 0,
      snackbarText: ''
    }
  },
  methods: {
    scale(v) {
      if (Number(v) <= 0)
        return

      const image = this.stage.get('Image')[0]
      if (image.width() * v > this.MAX_WIDTH_HEIGHT) {
        v = this.MAX_WIDTH_HEIGHT / image.width()
        this.snackbarText = `超過寬度上限(${this.MAX_WIDTH_HEIGHT}px)囉`
        this.$refs.snackbar.open()
      }
      if (image.height() * v > this.MAX_WIDTH_HEIGHT) {
        v = this.MAX_WIDTH_HEIGHT / image.height()
        this.snackbarText = `超過高度上限(${this.MAX_WIDTH_HEIGHT}px)囉`
        this.$refs.snackbar.open()
      }
      this.scaleRate = v
      image.scaleX(v)
      image.scaleY(v)
      this.stage.width(image.width() * v)
      this.stage.height(image.height() * v)
      this.stage.draw()
    },
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
        text: uselessMottos(),
        fontSize: 30,
        fontFamily: 'cwTeXHei',
        fill: 'black',
        shadowColor: 'black',
        shadowBlur: 30,
        shadowOffset: [10, 10],
        shadowOpacity: 0.5,
        draggable: true
      })
      textLayer.add(text)
      this.stage.add(textLayer)
      this.texts.push(text)
      textLayer.draw()
    },
    createGenerator(e) {
      if (this.name === '') {
        this.snackbarText = '請先幫產生器取個名字吧'
        this.$refs.snackbar.open()
        return
      }

      const image = this.stage.get('Image')[0]
      image.width(image.width() * image.scaleX())
      image.height(image.height() * image.scaleY())
      image.scale({
        x: 1,
        y: 1
      })

      const form = new FormData()
      form.append('name', this.name)
      form.append('description', this.description)
      form.append('isPrivate', this.isPrivate)
      form.append('image', dataURItoBlob(image.toDataURL()))
      form.append('preview', dataURItoBlob(this.stage.toDataURL()))
      form.append('texts', JSON.stringify(this.texts.map((text) => text.toJSON())))
      this.progress = 0.000001
      futch(DOMAIN + '/api/manufacture', {
          method: 'POST',
          mode: 'cors',
          body: form
        }, (e) => this.progress = e.loaded / e.total * 100)
        .then((text) => JSON.parse(text))
        .then((data) => {
          location.href = 'generator/' + data.id
        })
        .catch(function(error) {
          console.log('Request failed', error);
        });
    }
  },
  mounted() {
    const imageObj = this.image
    // if (!imageObj) {
    //   location.href = '/'
    // }
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
    if (image.width() > this.MAX_WIDTH_HEIGHT)
      image.scale({
        x: this.MAX_WIDTH_HEIGHT / image.width(),
        y: this.MAX_WIDTH_HEIGHT / image.width()
      })
    this.scaleRate = image.scale().x
    stage.size(image.getClientRect())
    imageLayer.add(image)
    stage.add(imageLayer)
    imageLayer.draw()

    // When create a new textbox,  focus on the lastest tab.
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes[0])
          mutation.addedNodes[0].click()
      })
    })
    observer.observe(this.$refs.textTabNavbar.$el.querySelector('nav'), {
      attributes: true,
      childList: true,
      characterData: true
    })

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
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 99999;
}

.default-flex {
  flex: initial;
}
</style>
