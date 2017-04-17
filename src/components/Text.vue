<template>
<md-card>
  <md-card-media>
    <md-ink-ripple />
    <img :src="src" alt="">
  </md-card-media>

  <md-card-header>
    <div class="md-title">文字方塊 {{index + 1}}</div>
  </md-card-header>

  <md-card-content>
    <md-input-container>
      <label>預設文字</label>
      <md-textarea :value="text.text()" @input="change('text', $event)"></md-textarea>
    </md-input-container>

    <md-button class="md-primary md-raised" id="colorPickerBtn" @click.native="$refs.colorDialog.open()">變更文字顏色</md-button>

    <md-layout md-gutter>
      <md-layout md-gutter="20" :md-flex-xsmall="xsmallFlex" :md-flex-small="smallFlex" :md-flex-medium="100">
        <md-input-container>
          <label for="fontFamily">字型</label>
          <md-select name="movie" id="fontFamily" :select="text.fontFamily()" @change="change('fontFamily', $event)">
            <md-option value="cwTeXFangSong">仿宋體</md-option>
            <md-option value="cwTeXHei">黑體</md-option>
            <md-option value="cwTeXKai">楷體</md-option>
            <md-option value="cwTeXMing">明體</md-option>
            <md-option value="cwTeXYen">圓體</md-option>
            <md-option value="Noto Sans TC">Noto Sans TC</md-option>
          </md-select>
        </md-input-container>
      </md-layout>

      <md-layout md-gutter="20" :md-flex-xsmall="xsmallFlex" :md-flex-small="smallFlex" :md-flex-medium="mediumFlex">
        <md-input-container>
          <label>文字大小</label>
          <md-input type="number" :value="text.fontSize()" @input="change('fontSize', Number($event))"></md-input>
        </md-input-container>
      </md-layout>

      <md-layout md-gutter="20" :md-flex-xsmall="xsmallFlex" :md-flex-small="smallFlex" :md-flex-medium="mediumFlex">
        <md-input-container>
          <label>X 座標</label>
          <md-input type="number" :value="text.x()" @input="change('x', Number($event))"></md-input>
        </md-input-container>
      </md-layout>

      <md-layout md-gutter="20" :md-flex-xsmall="xsmallFlex" :md-flex-small="smallFlex" :md-flex-medium="mediumFlex">
        <md-input-container>
          <label>Y 座標</label>
          <md-input type="number" :value="text.y()" @input="change('y', Number($event))"></md-input>
        </md-input-container>
      </md-layout>

      <md-layout md-gutter="20" :md-flex-xsmall="xsmallFlex" :md-flex-small="smallFlex" :md-flex-medium="mediumFlex">
        <md-input-container>
          <label>寬度</label>
          <md-input type="number" :value="text.width()" @input="change('width', Number($event))"></md-input>
        </md-input-container>
      </md-layout>

      <md-layout md-gutter="20" :md-flex-xsmall="xsmallFlex" :md-flex-small="smallFlex" :md-flex-medium="mediumFlex">
        <md-input-container>
          <label>長度</label>
          <md-input type="number" :value="text.height()" @input="change('height', Number($event))"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
  </md-card-content>

  <!-- <md-card-actions>
    <md-button class="md-icon-button">
      <md-icon>delete_forever</md-icon>
    </md-button>
  </md-card-actions> -->

  <md-dialog :md-backdrop="false" ref="colorDialog">
    <md-dialog-content>
      <chrome-picker style="display: inline;" v-model="colors" @change-color="change('fill', $event.hex)"></chrome-picker>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="$refs.colorDialog.close()">關閉</md-button>
    </md-dialog-actions>
  </md-dialog>
</md-card>
</template>

<script>
import {
  Chrome
} from 'vue-color'
export default {
  name: 'canvas-text',
  components: {
    'chrome-picker': Chrome
  },
  props: ['index', 'text'],
  data() {
    return {
      xsmallFlex: 50,
      smallFlex: 20,
      mediumFlex: 20,
      colors: {
        hex: '#000000',
        a: 1,
        hsl: {
          h: 0,
          s: 0,
          l: 0,
          a: 1
        },
        hsv: {
          h: 0,
          s: 0,
          v: 0,
          a: 1
        },
        rgba: {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        }
      },
      src: this.text.toDataURL(),
    }
  },
  methods: {
    change(type, v) {
      this.text[type](v)
      this.text.getStage().draw()
      this.src = this.text.toDataURL({
        x: this.text.x(),
        y: this.text.y(),
      })
    }
  }
}
</script>

<style>
.thumbnail.active {
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 10px 20px;
  background-color: #eeeeee;
}
</style>
