<template>
<div class="firstStep">
  <div id="container"></div>
  <input id="fileUpload" type="file" accept="image/*" style="display:none"></input>
  變更底色
  <div id="cp7" class="inl-bl"></div>
  <button id="fileUploadBtn" type="button" class="btn btn-primary">
    <i class="material-icons">photo</i>新增圖片
  </button>
  <button id="createTextboxBtn" type="button" class="btn btn-primary">
    <i class="material-icons">text_fields</i>新增文字方塊
  </button>
  <button id="cropBtn" type="button" class="btn btn-primary">
    <i class="material-icons">crop</i>裁切畫布
  </button>
  <button id="createGenerator" type="button" class="btn btn-success">
    <i class="material-icons">build</i>建立生產線
  </button>
  <div id="setting-list">
    <div class="row">
      <canvas-image v-for="(image, i) in images" :key="i" :index="i" :src="image.toDataURL()" :x="image.x()" :y="image.y()" :width="image.width()" :height="image.height()" v-on:change="change" v-on:focus="focus" v-on:blur="blur" @changeMode="changeMode"></canvas-image>
      <canvas-text v-for="(text, i) in texts" :key="i" :index="i" :src="text.toDataURL()" :x="text.x()" :y="text.y()" :width="text.width()" :height="text.height()" v-on:changeText="changeText" v-on:focus="focus" v-on:blur="blur" @changeMode="changeMode"></canvas-text>
    </div>
  </div>
</div>
</template>

<script>
import canvasImage from './Image.vue'
import canvasText from './Text.vue'
export default {
  name: 'firstStep',
  components: {
    canvasImage,
    canvasText
  },
  data: function() {
    return {
      stage: void 0,
      images: [],
      texts: []
    }
  },
  methods: {
    change(action, type, i, v) {
      const
        image = this.images[i],
        imageGroup = image.getParent(),
        anchorGroup = imageGroup.get('.anchorGroup')[0],
        topLeft = anchorGroup.get('.topLeft')[0],
        topRight = anchorGroup.get('.topRight')[0],
        bottomLeft = anchorGroup.get('.bottomLeft')[0],
        bottomRight = anchorGroup.get('.bottomRight')[0]
      // change image x or y, width, height
      if (type === 'width')
        v = v / image.scaleX()
      if (type === 'height')
        v = v / image.scaleY()
      image[type](v)
      const
        width = image.getClientRect().width,
        height = image.getClientRect().height
      // change anchors position
      topLeft.position(image.position())
      topRight.x(image.x() + width)
      topRight.y(image.y())
      bottomLeft.x(image.x())
      bottomLeft.y(image.y() + height)
      bottomRight.x(image.x() + width)
      bottomRight.y(image.y() + height)
      this.stage.draw()
    },
    changeMode(action, i) {
      const image = this.images[i]
      image.mode = action
      const anchorGroup = image.getParent().get('.anchorGroup')[0]
      anchorGroup.get('Circle').forEach((anchor) => {
        const
          image = anchor.getParent().getParent().get('Image')[0],
          action = image.mode
        // if (action === 'crop')
        //   anchor.dragBoundFunc(function(absPos) {
        //     let
        //       pos = this.getPosition(),
        //       x = pos.x,
        //       y = pos.y
        //     console.log(absPos.x, absPos.y)
        //     console.log(x, y)
        //     if (x < image.x())
        //       x = image.x()
        //     if (x > image.x() + image.width())
        //       x = image.x() + image.width()
        //     if (x < image.y())
        //       y = image.y()
        //     if (y > image.y() + image.width())
        //       y = image.y() + image.width()
        //     console.log(x, image.x(), image.width())
        //     console.log(x + absPos.x, y + absPos.y)
        //     console.log(' ')
        //     return {
        //       x: x + absPos.x,
        //       y: y + absPos.y
        //     }
        //   })
        // else
        //   anchor.dragBoundFunc(function(pos) {
        //     return {
        //       x: pos.x,
        //       y: pos.y
        //     }
        //   })
      })
    },
    changeText(action, i, v) {
      const text = this.texts[i]
      if (action === 'text') {
        text.text(v)
        text.draw()
      }
    },
    focus(type, i) {
      if (type === 'text')
        return
      const
        image = this.images[i],
        imgLayer = image.getParent(),
        anchorGroup = imgLayer.get('.anchorGroup')[0]
      imgLayer.moveToTop()
      this.images.forEach((image, i) => this.blur('image', i))
      this.texts.forEach((text, i) => this.blur('text', i))
      anchorGroup.show()
      this.stage.draw()
    },
    blur(type, i) {
      if (type === 'text')
        return
      const
        image = this.images[i],
        imgLayer = image.getParent(),
        anchorGroup = imgLayer.get('.anchorGroup')[0]
      this.texts.forEach((text, i) => this.focus('text', i))
      anchorGroup.hide()
      this.stage.draw()
    }
  },
  mounted() {
    const
      containerWidth = 500,
      containerHeight = 500
    const stage = this.stage = new Konva.Stage({
      container: 'container',
      width: containerWidth,
      height: containerHeight
    })
    const
      images = this.images,
      texts = this.texts

    function createBackground() {
      const rect = new Konva.Rect({
        name: 'backgroundColorRect',
        x: 0,
        y: 0,
        width: containerWidth,
        height: containerHeight,
        fill: '#eeeeee'
      })
      const layer = new Konva.Layer({
        name: 'backgroundColorLayer'
      })
      layer.add(rect)
      stage.add(layer)
    }
    createBackground()

    // 建立 color picker
    function setupColorPicker() {
      $('#cp7')
        .colorpicker({
          color: '#eeeeee',
          container: true,
          inline: true
        })
        .on('changeColor', (e) => {
          const
            layer = stage.get('.backgroundColorLayer')[0],
            rect = layer.get('.backgroundColorRect')[0]
          rect.fill(e.color.toHex())
          rect.draw()
        })
    }
    setupColorPicker()

    // 新增圖片
    function setupAddImage() {
      function addAnchor(group, x, y, name) {
        function update(activeAnchor) {
          const
            group = activeAnchor.getParent(),
            topLeft = group.get('.topLeft')[0],
            topRight = group.get('.topRight')[0],
            bottomRight = group.get('.bottomRight')[0],
            bottomLeft = group.get('.bottomLeft')[0],
            imageGroup = group.getParent(),
            image = imageGroup.get('Image')[0],
            mode = image.mode || 'resize'
          if (mode === 'resize') {
            const
              width = image.width(),
              height = image.height(),
              resizeWidth = topRight.getX() - topLeft.getX(),
              resizeHeight = bottomLeft.getY() - topLeft.getY(),
              scaleWidth = resizeWidth / width,
              scaleHeight = resizeHeight / height
            image.scaleX(scaleWidth)
            image.scaleY(scaleHeight)
            image.position(topLeft.position())
          } else if (mode === 'crop') {
            if (!image.oriPosition)
              image.oriPosition = {
                x: topLeft.x() - image.cropX() * image.scaleX(),
                y: topLeft.y() - image.cropY() * image.scaleY()
              }
            const
              x = topLeft.x() - image.oriPosition.x,
              y = topLeft.y() - image.oriPosition.y,
              cropWidth = bottomRight.x() - topLeft.x(),
              cropHeight = bottomRight.y() - topLeft.y(),
              scaleWidth = image.scaleX(),
              scaleHeight = image.scaleY(),
              scaledX = x / scaleWidth,
              scaledY = y / scaleHeight,
              cropScaledWidth = cropWidth / scaleWidth,
              cropScaledHeight = cropHeight / scaleHeight
            image.crop({
              x: scaledX,
              y: scaledY,
              width: cropScaledWidth,
              height: cropScaledHeight
            })
            image.width(cropScaledWidth)
            image.height(cropScaledHeight)
            image.position(topLeft.position())
          } else {
            console.warn('Unknown mode.')
          }
        }
        const stage = group.getStage()
        const layer = group.getLayer()
        const anchor = new Konva.Circle({
          x: x,
          y: y,
          stroke: '#666',
          fill: '#ddd',
          strokeWidth: 2,
          radius: 8,
          name: name,
          draggable: true,
          dragOnTop: false
        })
        anchor.on('dragmove', function() {
          update(this)
          this.getParent().updateAnchors(this)
          layer.draw()
        })
        anchor.on('mousedown touchstart', function() {
          group.setDraggable(false)
          this.moveToTop()
        })
        anchor.on('dragstart', function() {
          const
            anchorGroup = anchor.getParent(),
            topLeft = anchorGroup.get('.topLeft')[0],
            image = anchorGroup.getParent().get('Image')[0]
          image.oriPosition = {
            x: topLeft.x() - image.cropX() * image.scaleX(),
            y: topLeft.y() - image.cropY() * image.scaleY()
          }
        })
        anchor.on('dragend', function() {
          const
            anchorGroup = anchor.getParent(),
            image = anchorGroup.getParent().get('Image')[0]
          image.oriPosition = void 0
          group.setDraggable(true)
          layer.draw()
        })
        // add hover styling
        anchor.on('mouseover', function() {
          const layer = this.getLayer()
          document.body.style.cursor = 'pointer'
          this.setStrokeWidth(4)
          layer.draw()
        })
        anchor.on('mouseout', function() {
          const layer = this.getLayer()
          document.body.style.cursor = 'default'
          this.setStrokeWidth(2)
          layer.draw()
        })
        group.add(anchor)
      }

      // 讀取圖片
      const input = document.querySelector('input[type=file]')
      input.onchange = () => {
        const
          filesToUpload = input.files,
          file = filesToUpload[0],
          reader = new FileReader()
        reader.onload = (e) => {
          // 建立圖片的圖層
          const imageObj = new Image()
          imageObj.src = e.target.result
          imageObj.onload = () => {
            const imageLayer = new Konva.Layer()
            const imageGroup = new Konva.Group({
              name: 'imageGroup',
              x: 0,
              y: 0
            })
            const anchorGroup = new Konva.Group({
              name: 'anchorGroup',
              x: 0,
              y: 0
            })
            anchorGroup.updateAnchors = function(activeAnchor) {
              const
                image = this.getParent().get('Image')[0],
                topLeft = this.get('.topLeft')[0],
                topRight = this.get('.topRight')[0],
                bottomRight = this.get('.bottomRight')[0],
                bottomLeft = this.get('.bottomLeft')[0]
              if (activeAnchor) {
                let
                  anchorX = activeAnchor.getX(),
                  anchorY = activeAnchor.getY()
                switch (activeAnchor.getName()) {
                  case 'topLeft':
                    topRight.setY(anchorY)
                    bottomLeft.setX(anchorX)
                    break
                  case 'topRight':
                    topLeft.setY(anchorY)
                    bottomRight.setX(anchorX)
                    break
                  case 'bottomRight':
                    bottomLeft.setY(anchorY)
                    topRight.setX(anchorX)
                    break
                  case 'bottomLeft':
                    bottomRight.setY(anchorY)
                    topLeft.setX(anchorX)
                    break
                }
              } else {
                topLeft.position(image.position())
                bottomRight.x(image.x() + image.width() * image.scaleX())
                bottomRight.y(image.y() + image.height() * image.scaleY())
                topRight.x(bottomRight.x())
                topRight.y(image.y())
                bottomLeft.x(image.x())
                bottomLeft.y(bottomRight.y())
              }
            }
            imageLayer.add(imageGroup)
            stage.add(imageLayer)
            const
              scale = (containerWidth / imageObj.width < containerHeight / imageObj.height) ?
              containerWidth / imageObj.width :
              containerHeight / imageObj.height,
              width = imageObj.width * scale,
              height = imageObj.height * scale
            const image = new Konva.Image({
              scaleX: scale,
              scaleY: scale,
              draggable: true
            })
            image.on('dragmove', function() {
              this.getParent().get('.anchorGroup')[0].updateAnchors()
            })
            image.image(imageObj)
            imageGroup.add(image)
            imageGroup.add(anchorGroup)
            addAnchor(anchorGroup, 0, 0, 'topLeft')
            addAnchor(anchorGroup, width, 0, 'topRight')
            addAnchor(anchorGroup, width, height, 'bottomRight')
            addAnchor(anchorGroup, 0, height, 'bottomLeft')
            images.push(image)
            imageGroup.draw()
          }
        }
        reader.readAsDataURL(file)
      }

      // 新增圖片按鈕
      const fileUploadBtn = document.getElementById('fileUploadBtn')
      const fileUpload = document.getElementById('fileUpload')
      fileUploadBtn.onclick = () => {
        fileUpload.click()
      }
    }
    setupAddImage()

    // 裁切
    function setupCropFunction() {
      let cropMode = false
      const cropBtn = document.getElementById('cropBtn')
      const stageAnchorGroup = new Konva.Group({
        name: 'stageAnchorGroup',
        x: 0,
        y: 0
      })
      cropBtn.onclick = () => {
        if (!cropMode) {
          function addAnchor(group, x, y, name) {
            function update(activeAnchor) {
              const group = activeAnchor.getParent(),
                topLeft = group.get('.topLeft')[0],
                topRight = group.get('.topRight')[0],
                bottomRight = group.get('.bottomRight')[0],
                bottomLeft = group.get('.bottomLeft')[0],
                image = group.getParent().get('Image')[0],
                anchorX = activeAnchor.getX(),
                anchorY = activeAnchor.getY()
              // update anchor positions
              switch (activeAnchor.getName()) {
                case 'topLeft':
                  topRight.setY(anchorY)
                  bottomLeft.setX(anchorX)
                  break
                case 'topRight':
                  topLeft.setY(anchorY)
                  bottomRight.setX(anchorX)
                  break
                case 'bottomRight':
                  bottomLeft.setY(anchorY)
                  topRight.setX(anchorX)
                  break
                case 'bottomLeft':
                  bottomRight.setY(anchorY)
                  topLeft.setX(anchorX)
                  break
              }
              image.position(topLeft.position())
              const width = topRight.getX() - topLeft.getX(),
                height = bottomLeft.getY() - topLeft.getY()
              if (width && height) {
                image.width(width)
                image.height(height)
              }
            }
            const stage = group.getStage(),
              layer = group.getLayer(),
              anchor = new Konva.Circle({
                x: x,
                y: y,
                stroke: 'blue',
                fill: 'red',
                strokeWidth: 2,
                radius: 8,
                name: name,
                draggable: true,
                dragOnTop: false
              })
            anchor.on('dragmove', function() {
              update(this)
              layer.draw()
            })
            anchor.on('mousedown touchstart', function() {
              group.setDraggable(false)
              this.moveToTop()
            })
            anchor.on('dragend', function() {
              group.setDraggable(true)
              layer.draw()
            })
            // add hover styling
            anchor.on('mouseover', function() {
              const layer = this.getLayer()
              document.body.style.cursor = 'pointer'
              this.setStrokeWidth(4)
              layer.draw()
            })
            anchor.on('mouseout', function() {
              const layer = this.getLayer()
              document.body.style.cursor = 'default'
              this.setStrokeWidth(2)
              layer.draw()
            })
            group.add(anchor)
          }
          const imageObj = new Image()
          const imgLayer = new Konva.Layer({
            name: 'imgLayer'
          })
          imageObj.onload = () => {
            const anchorGroup = new Konva.Group({
              name: 'anchorGroup',
              x: 0,
              y: 0
            })
            const imageGroup = new Konva.Group({
              name: 'imageGroup',
              x: 0,
              y: 0,
              draggable: false
            })
            stage.add(imgLayer)
            const image = new Konva.Image({
              width: 500,
              height: 500
            })
            backgroundImg.image(imageObj)
            imageGroup.add(image)
            imageGroup.add(anchorGroup)
            imgLayer.add(imageGroup)
            addAnchor(anchorGroup, 0, 0, 'topLeft')
            addAnchor(anchorGroup, 500, 0, 'topRight')
            addAnchor(anchorGroup, 500, 500, 'bottomRight')
            addAnchor(anchorGroup, 0, 500, 'bottomLeft')
            images.push(imgLayer)
            imgLayer.draw()
          }
          cropMode = true
          images.forEach((imageLayer) => {
            imageLayer.get('.anchorGroup').destroy()
            imageLayer.draw()
          })
          const anchorLayer = new Konva.Layer({
            name: 'anchorLayer'
          })
          const width = stage.width()
          const height = stage.height()
          addAnchor(stageAnchorGroup, 0, 0, 'topLeft')
          addAnchor(stageAnchorGroup, width, 0, 'topRight')
          addAnchor(stageAnchorGroup, width, height, 'bottomRight')
          addAnchor(stageAnchorGroup, 0, height, 'bottomLeft')
          anchorLayer.add(stageAnchorGroup)
          stage.add(anchorLayer)
          anchorLayer.draw()
        } else {
          cropMode = false
          const bottomRight = stageAnchorGroup.get('.bottomRight')[0]
          const topLeft = stageAnchorGroup.get('.topLeft')[0]
          const width = bottomRight.getX() - topLeft.getX()
          const height = bottomRight.getY() - topLeft.getY()
          stage.position({
            x: -topLeft.position().x,
            y: -topLeft.position().y
          })
          stage.draw()
          stageAnchorGroup.destroy()
          stage.size({
            width: width,
            height: height
          })
        }
      }
    }
    setupCropFunction()

    // 新增文字方塊
    function setupAddTextbox() {
      const createTextboxBtn = document.getElementById('createTextboxBtn')
      const textGroup = new Konva.Group({
        draggable: true
      })
      const textLayer = new Konva.Layer()
      textLayer.add(textGroup)
      stage.add(textLayer)
      createTextboxBtn.onclick = () => {
        const text = new Konva.Text({
          x: 0,
          y: 0,
          text: 'Simple Text',
          fontSize: 30,
          fontFamily: 'Calibri',
          fill: 'green'
        })
        const rect = new Konva.Rect({
          x: 0,
          y: 0,
          width: text.width(),
          height: text.height(),
          stroke: 'red',
          strokeWidth: 1
        })
        text.setText('測試文字')
        textGroup.add(rect)
        textGroup.add(text)
        texts.push(text)
        textLayer.draw()
      }
    }
    setupAddTextbox()
  }
}
</script>

<style>
.konvajs-content {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
