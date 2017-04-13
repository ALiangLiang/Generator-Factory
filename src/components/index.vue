<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <div id="dropzone" class="dropzone" @dragover="dragover" @drop="dropFile" @click="uploadFile">請將底圖拖曳進來XD</div>
  <a type="button" href="#/manufacture" class="btn btn-primary">
    <i class="material-icons">send</i>開始製作
  </a>
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
    dragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    dropFile(e) {
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length !== 1)
        return
      this.loadFile(files[0])
    },
    uploadFile() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.click()
      input.onchange = () => {
        const files = input.files
        if (files.length !== 1)
          return
        this.loadFile(files[0])
      }
    },
    loadFile(file) {
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
    },
    mounted() {}
  }
}
</script>

<style scoped>

</style>
