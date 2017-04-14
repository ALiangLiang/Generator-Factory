<template>
<md-card>
  <md-card-header>
    <div class="md-title">文字方塊 {{index + 1}}</div>
  </md-card-header>

  <md-card-content>
    <md-input-container>
      <label>文字方塊內容</label>
      <md-textarea :value="text.text()" @input="changeText($event)"></md-textarea>
    </md-input-container>
  </md-card-content>
</md-card>
</template>

<script>
export default {
  name: 'generator-text',
  props: ['index', 'text'],
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
