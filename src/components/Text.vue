changeText<template>
<div>
  <div class="col-sm-6 col-md-4">
    <img :src="src" alt="">
    <div class="caption">
      <h3>文字 {{index + 1}}</h3>
      <p>
        <label for="x">測試文字</label>
        <textarea id="x" class="form-control" type="text" :value="text.text()" @input="change('text', $event.target.value)"></textarea>

        <label for="x">文字大小</label>
        <input id="x" class="form-control" type="text" :value="text.fontSize()" @input="change('fontSize', $event.target.value)">

        <label for="text-color">文字顏色</label>
        <div id="text-color" class="inl-bl"></div>

        <label for="x">X 座標</label>
        <input id="x" class="form-control" type="text" :value="text.x()" @input="change('x', $event.target.value)">

        <label for="y">Y 座標</label>
        <input id="y" class="form-control" type="text" :value="text.y()" @input="change('y', $event.target.value)">

        <label for=" width ">寬度</label>
        <input id="width " class="form-control " type="text " :value="text.width()" @input="change( 'width', $event.target.value) ">

        <label for="height">長度</label>
        <input id="height" class="form-control" type="text" :value="text.height()" @input="change('height', $event.target.value)">
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'canvas-text',
  props: ['index', 'text'],
  data() {
    return {
      src: this.text.toDataURL(),
    }
  },
  methods: {
    change(type, v) {
      this.text[type](v)
      this.text.getStage().draw()
    }
  },
  mounted() {
    $('#text-color')
      .colorpicker({
        color: '#eeeeee',
        container: true,
        inline: true
      })
      .on('changeColor', (e) => {
        this.change('fill', e.color.toHex())
      })
  }
}
</script>

<style>
.thumbnail.active {
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 10px 20px;
  background-color: #eeeeee;
}
</style>
