<template>
<div class="hello">
  <div v-if="!image">
    <h1>{{ msg }}</h1>
    <md-whiteframe md-elevation="2">
      <input type="file" class="dropify" accept="image/*" data-height="300" @change="loadFile" />
    </md-whiteframe>
    <span class="md-display-3">

    </span>
  </div>

  <manufacture v-if="image" :image="image"></manufacture>

  <vue-disqus shortname="generator-factory" :identifier="$route.path" :url="url"></vue-disqus>
</div>
</template>

<script>
import $ from 'jquery'
import dropify from 'dropify'
import 'dropify/dist/css/dropify.min.css'
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import manufacture from './manufacture.vue'
export default {
  name: 'index',
  components: {
    VueDisqus,
    manufacture
  },
  data() {
    return {
      msg: '歡迎使用 圖文產生器工廠',
      image: void 0,
      url: document.location.href
    }
  },
  methods: {
    loadFile(e) {
      const files = e.target.files
      if (files.length !== 1)
        return
      const file = files[0]
      this.readFile(file)
    },
    readFile(file) {
      if (file.type.match(/image.*/)) {
        const reader = new FileReader();

        reader.onload = (e2) => {
          const img = document.createElement('img')
          img.onload = () => {
            this.image = img
            // location.href = '/manufacture'
          }
          img.src = e2.target.result
        }

        reader.readAsDataURL(file)
      }
    }
  },
  mounted() {
    $('.dropify').dropify({
      messages: {
        'default': `如何開始?
        <br>1. 將底圖拖曳進來~
        <br>2. 或是點它上傳
        <br>3. ctrl+V 貼上圖片`,
        'replace': 'Drag and drop or click to replace',
        'remove': '移除',
        'error': '阿哩? 好像出了點錯誤'
      }
    })

    document.addEventListener('paste', (e) => {
      const items = e.clipboardData.items
      if (items.length !== 1)
        return
      const file = items[0]
      if (file.type.match(/image.*/))
        this.readFile(file.getAsFile())
    })
  }
}
</script>

<style scoped>
.dropzone {
  margin: auto;
  height: 500px;
  width: 50%;
  border: black;
  border-width: 2px;
  border-style: dashed;
}
</style>
