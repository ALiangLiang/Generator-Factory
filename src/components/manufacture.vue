<template>
<div class="manufacture">
  <div class="on-top" :style="(progress === 0)?'display:none;':''">
    <v-progress-linear style="margin:0px" v-model="progress"></v-progress-linear>
  </div>

  <div id="container"></div>

  <v-text-field label="產生器名稱" v-model="name" required></v-text-field>

  <v-text-field label="簡介" v-model="description" multi-line></v-text-field>

  <v-checkbox label="不公開產生器 (只有擁有連結的人可以使用)`" primary v-model="isPrivate" light />

  <v-text-field type="number" label="縮放" v-model="scaleRate" @input="scale"></v-text-field>

  <v-btn primary class="btn--light-flat-focused" v-bind:loading="isUploading" v-bind:disabled="isUploading" @click.native="createGenerator">
    <v-icon>build</v-icon>組裝產生器
  </v-btn>


  <v-card>
    <v-card-row actions>
      <v-card-title>
        <v-btn primary class="btn--light-flat-focused" @click.native="createTextbox">
          <v-icon>text_fields</v-icon>新增文字方塊
        </v-btn>
      </v-card-title>
    </v-card-row>

    <v-card-row actions>
      <v-tabs id="mobile-tabs-1" grow scroll-bars>
        <v-tab-item v-for="(text, i) in texts" :key="i" v-bind:href="'#text-tabs-1-' + i" ripple slot="activators">
          文字 {{i + 1}}
        </v-tab-item>
        <v-tab-content v-for="(text, i) in texts" :key="i" v-bind:id="'text-tabs-1-' + i" slot="content">
          <canvas-text :index="i" :text="text"></canvas-text>
        </v-tab-content>
      </v-tabs>
    </v-card-row>
  </v-card>

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
      snackbarText: '',
      isUploading: false
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
