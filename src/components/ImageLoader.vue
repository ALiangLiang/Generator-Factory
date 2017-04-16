<template>
<div>
  <md-spinner md-indeterminate ref="spinner" :class="{'display-none':isLoaded}"></md-spinner>
  <img :src="src" :crossOrigin="crossOrigin" @load="imageLoaded" :class="{'display-none':!isLoaded}"></img>
</div>
</template>

<script>
export default {
  name: 'image-loader',
  props: ['src', 'crossOrigin'],
  data: function() {
    return {
      isLoaded: false
    }
  },
  methods: {
    imageLoaded(e) {
      this.isLoaded = true
      this.$emit('load', e)
    }
  }
}
</script>

<style scoped>
.display-none {
  display: none;
}
</style>
