<template>
<div>
  <div class="col-sm-6 col-md-4">
    <img :src="text.toDataURL()" alt="">
    <div class="caption">
      <h3>文字 {{index + 1}}</h3>
      <p>
        <label for="textbox">內容</label>
        <textarea id="textbox" class="form-control" :value="text.text()" @input="changeText($event.target.value)"></textarea>
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'generator-text',
  props: ['index', 'text'],
  data() {
    return {}
  },
  methods: {
    changeText(text) {
      this.text.text(text)
      this.text.getStage().draw()
    }
  },
  mounted() {}
}
</script>

<style>
.thumbnail.active {
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 10px 20px;
  background-color: #eeeeee;
}
</style>
