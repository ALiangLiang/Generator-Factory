<template>
<div class="generator">
  <div class="on-top" :style="(progress === 0)?'display:none;':''">
    <md-progress class="md-accent" :md-progress="progress"></md-progress>
  </div>

  <span class="md-display-3">{{name}}</span>
  <br>
  <span class="md-subheading">{{description}}</span>

  <div id="container"></div>

  <md-input-container>
    <label>複製連結</label>
    <md-input id="url-input" :value="url" @click.native="selectAll" @input.native="fixedText"></md-input>
    <md-button id="copy-url" class="md-icon-button" :data-clipboard-text="url" @click.native="selectAll">
      <md-icon>content_copy</md-icon>
      <md-tooltip md-direction="bottom">複製</md-tooltip>
    </md-button>
  </md-input-container>

  <md-button class="md-raised md-primary" target="_blank" :href="'https://www.facebook.com/share.php?u=' + url">
    <md-icon>share</md-icon>分享至臉書
  </md-button>

  <md-button class="md-raised md-primary" @click.native="generate">
    <md-icon>create</md-icon>產生圖文
  </md-button>

  <div class="row">
    <generator-text v-for="(text, i) in texts" :key="i" :index="i" :text="text"></generator-text>
  </div>

  <md-snackbar md-position="bottom center" ref="snackbar" md-duration="4000">
    <span>成功複製網址</span>
    <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
  </md-snackbar>
</div>
</template>

<script>
import Konva from 'Konva'
import Clipboard from 'clipboard'
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
      name: '　',
      description: '　',
      progress: 0,
      url: document.location.href
    }
  },
  methods: {
    selectAll(e) {
      this.$refs.snackbar.open();
      document.getElementById('copy-url').click()
      document.getElementById('url-input').select()
    },
    fixedText(e) {
      e.target.value = this.url
    },
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
    if (!this.$route.params.id)
      location.href = '#/'

    new Clipboard('#copy-url')

    fetch('https://aliangliang.com.tw:8787/generator/' + this.$route.params.id, {
        method: 'get',
        mode: 'cors',
      })
      .then((res) => res.json())
      .then((data) => {
        const
          imageUrl = 'https://aliangliang.com.tw:8787/' + data.image,
          textsJSON = data.texts

        this.name = data.name
        this.description = data.description

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
adow: rgba(0, 0, 0, 0.0745098) 0px 10px 20px;
  background-color: #eeeeee;
}

.on-top {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
</style>
yle>
