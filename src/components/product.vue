<template>
<div class="product">
  <image-loader :src="src" crossOrigin="anonymous" @load="isDlBtnDisabled = false"></image-loader>

  <md-input-container>
    <label>複製連結</label>
    <md-input id="url-input" :value="url" @click.native="selectAll" @input.native="fixedText"></md-input>
    <md-button id="copy-url" class="md-icon-button" :data-clipboard-text="url" @click.native="selectAll">
      <md-icon>content_copy</md-icon>
      <md-tooltip md-direction="bottom">複製</md-tooltip>
    </md-button>
  </md-input-container>

  <md-button class="md-raised md-primary" :disabled="isDlBtnDisabled" @click.native="download">
    <md-icon>file_download</md-icon>下載
  </md-button>

  <!-- <md-button class="md-raised md-primary" @click.native="uploadToImgur">
    <md-icon>file_upload</md-icon>上傳imgur
  </md-button> -->

  <md-button class="md-raised md-primary" target="_blank" :href="'https://www.facebook.com/share.php?u=' + encodeURIComponent(url)">
    <md-icon>share</md-icon>分享至臉書
  </md-button>

  <vue-disqus shortname="generator-factory" :identifier="$route.path" :url="url"></vue-disqus>

  <md-snackbar md-position="bottom center" ref="snackbar" md-duration="4000">
    <span>{{snackbarText}}</span>
    <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Close</md-button>
  </md-snackbar>
</div>
</template>

<script>
import Clipboard from 'clipboard'
import download from 'downloadjs'
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import ImageLoader from './ImageLoader.vue'
export default {
  name: 'product',
  components: {
    VueDisqus,
    ImageLoader
  },
  data: function() {
    return {
      src: '',
      url: document.location.href,
      snackbarText: '',
      isDlBtnDisabled: true
    }
  },
  methods: {
    selectAll(e) {
      this.snackbarText = '成功複製網址'
      this.$refs.snackbar.open()
      document.getElementById('copy-url').click()
      document.getElementById('url-input').select()
    },
    fixedText(e) {
      e.target.value = this.url
    },
    download() {
      const img = document.querySelector('img')
      img.setAttribute('crossOrigin', 'anonymous');

      function getBase64Image(img) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      }

      download('data:image/png;base64,' + getBase64Image(img), 'image.png', 'image/png')
    }
  },
  mounted() {
    if (!this.$route.params.id)
      location.href = '/'

    new Clipboard('#copy-url')

    fetch(DOMAIN + '/api/product/' + this.$route.params.id, {
        method: 'get',
        mode: 'cors',
      })
      .then((res) => res.json())
      .then((data) => {
        this.src = DOMAIN + data.image
      })
  }
}
</script>

<style>

</style>
