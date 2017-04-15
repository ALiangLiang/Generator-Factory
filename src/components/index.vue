<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <md-whiteframe md-elevation="2">
    <input type="file" class="dropify" data-height="300" @change="loadFile" />
  </md-whiteframe>
</div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: '歡迎使用 圖文產生器工廠'
    }
  },
  methods: {
    loadFile(e) {
      const files = e.target.files
      if (files.length !== 1)
        return
      const file = files[0]
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();

        reader.onload = (e2) => {
          const img = document.createElement('img')
          img.onload = () => {
            this.image = img
            this.$router.image = img
            location.href = '#/manufacture'
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
        'default': '請將底圖拖曳進來哦~ 或是點它上傳',
        'replace': 'Drag and drop or click to replace',
        'remove': '移除',
        'error': '阿哩? 好像出了點錯誤'
      }
    });
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
