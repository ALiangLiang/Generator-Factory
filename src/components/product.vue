<template>
<div class="product">
  <img id="product-image"></img>
</div>
</template>

<script>
export default {
  name: 'product',
  mounted() {
    if (!this.$router.product)
      location.href = '#/'

    const imageUrl = this.$router.product.imageUrl

    const imageObj = document.getElementById('product-image')
    imageObj.src = imageUrl
  }
}
</script>

<style>

</style>
