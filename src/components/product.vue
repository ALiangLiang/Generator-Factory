<template>
<div class="product">
  <md-image crossOrigin="anonymous" :md-src="src"></md-image>

  <md-button class="md-raised md-primary" @click.native="download">
    <md-icon>create</md-icon>下載
  </md-button>

  <md-button class="md-raised md-primary" @click.native="uploadToImgur">
    <md-icon>create</md-icon>上傳imgur
  </md-button>

  <md-button class="md-raised md-primary" @click.native="shareWithFB">
    <md-icon>create</md-icon>分享至臉書
  </md-button>
</div>
</template>

<script>
export default {
  name: 'product',
  data: function() {
    return {
      src: ''
    }
  },
  methods: {
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
      location.href = '#/'

    fetch('https://aliangliang.com.tw:8787/product/' + this.$route.params.id, {
        method: 'get',
        mode: 'cors',
      })
      .then((res) => res.json())
      .then((data) => {
        this.src = 'https://aliangliang.com.tw:8787/' + data.image
      })
  }
}
</script>

<style>

</style>
