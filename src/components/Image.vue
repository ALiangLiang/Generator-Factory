<template>
<div>
  <div class="col-sm-6 col-md-4">
    <div v-bind:class="{ active: isFocus, thumbnail: true }">
      <img v-bind:src="src" alt="...">
      <div class="caption">
        <h3>圖片 {{index + 1}}</h3>
        <p>
          <input type="checkbox" name="isCropMode">
          <br>
          <label for="x">X 座標</label>
          <input id="x" class="form-control" type="text" v-bind:value="x_copy" v-on:keydown.enter="change('x', $event)" @focus="focus" @blur="blur">
          <label for="y">Y 座標</label>
          <input id="y" class="form-control" type="text" v-bind:value="y_copy" v-on:keydown.enter="change('y', $event)" @focus="focus" @blur="blur">
          <label for=" width ">寬度</label>
          <input id="width " class="form-control " type="text " v-bind:value="width_copy " v-on:keydown.enter="change( 'width', $event) " @focus="focus" @blur="blur">
          <label for="height">長度</label>
          <input id="height" class="form-control" type="text" v-bind:value="height_copy" v-on:keydown.enter="change('height', $event)" @focus="focus" @blur="blur">
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'canvas-image',
  props: ['index', 'src', 'x', 'y', 'width', 'height'],
  data() {
    return {
      isFocus: false,
      isCropMode: false,
      x_copy: this.x,
      y_copy: this.y,
      width_copy: this.width,
      height_copy: this.height
    }
  },
  methods: {
    change(type, e) {
      const mode = (this.isCropMode) ? 'resize' : 'crop'
      this[type + '_copy'] = Number(e.target.value)
      this.$emit('change', mode, type, this.index, this[type + '_copy'])
    },
    changeMode() {
      const mode = (this.isCropMode) ? 'resize' : 'crop'
      this.$emit('changeMode', mode, this.index)
    },
    focus() {
      this.isFocus = true
      this.$emit('focus', 'image', this.index)
    },
    blur() {
      this.isFocus = false
      this.$emit('blur', 'image', this.index)
    }
  },
  mounted() {
    const self = this
    this.focus('image', this.index)
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
