<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <a type="button" href="#/manufacture" class="btn btn-primary">
    <i class="material-icons">send</i>開始製作
  </a>
</div>
</template>

<script>
export default {
  name: 'hello',
  props: ['stage'],
  data() {
    return {
      msg: '歡迎使用 圖文產生器工廠'
    }
  }
}
</script>

<style scoped>

</style>
