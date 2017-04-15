<template>
<div class="product">
  <md-image :md-src="src"></md-image>
</div>
</template>

<script>
export default {
  name: 'product',
  data: function() {
    return {
      src: ''
    }
  },
  mounted() {
    if (!this.$route.params.id)
      location.href = '#/'

    fetch('https://aliangliang.com.tw:8787/product/' + this.$route.params.id, {
        method: 'get',
        mode: 'cors',
      })
      .then((res) => res.json())
      .then((data) => {
        this.src = 'https://aliangliang.com.tw:8787/' + data.image
      })
  }
}
</script>

<style>

</style>
