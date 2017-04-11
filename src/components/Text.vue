<template>
<div>
  <div class="col-sm-6 col-md-4">
    <div :class="{ active: isFocus, thumbnail: true }">
      <img v-bind:src="src" alt="...">
      <div class="caption">
        <h3>文字 {{index + 1}}</h3>
        <p>
          <label for="x">測試文字</label>
          <input id="x" class="form-control" type="text" :value="text_copy" v-on:keydown.enter="changeText('text', $event)" @focus="focus" @blur="blur">
          <label for="x">X 座標</label>
          <input id="x" class="form-control" type="text" :value="x_copy" v-on:keydown.enter="changeText('x', $event)" @focus="focus" @blur="blur">
          <label for="y">Y 座標</label>
          <input id="y" class="form-control" type="text" :value="y_copy" v-on:keydown.enter="changeText('y', $event)" @focus="focus" @blur="blur">
          <label for=" width ">寬度</label>
          <input id="width " class="form-control " type="text " :value="width_copy " v-on:keydown.enter="changeText( 'width', $event) " @focus="focus" @blur="blur">
          <label for="height">長度</label>
          <input id="height" class="form-control" type="text" :value="height_copy" v-on:keydown.enter="changeText('height', $event)" @focus="focus" @blur="blur">
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'canvas-text',
  props: ['index', 'src', 'x', 'y', 'width', 'height'],
  data() {
    return {
      isFocus: false,
      isCropMode: false,
      text_copy: '測試文字',
      x_copy: this.x,
      y_copy: this.y,
      width_copy: this.width,
      height_copy: this.height
    }
  },
  methods: {
    changeText(type, e) {
      if (type !== 'text')
        this[type + '_copy'] = Number(e.target.value)
      else
        this['text_copy'] = e.target.value
      this.$emit('changeText', type, this.index, this[type + '_copy'])
    },
    focus() {
      this.isFocus = true
      this.$emit('focus', 'text', this.index)
    },
    blur() {
      this.isFocus = false
      this.$emit('blur', 'text', this.index)
    }
  },
  mounted() {
    const self = this
    $("input[name='isCropMode']").bootstrapSwitch({
      onText: '縮放圖片',
      offText: '裁切圖片',
      labelText: '模式',
      offColor: 'info',
      state: !this.isCropMode,
      onSwitchChange(e) {
        self.isCropMode = e.target.checked
        self.changeMode()
      }
    });
  }
}
</script>

<style>
.thumbnail.active {
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 10px 20px;
  background-color: #eeeeee;
}
</style>
