<template>
<div>
  <md-toolbar class="md-dense">
    <md-button class="md-icon-button">
      <md-icon>menu</md-icon>
    </md-button>

    <router-link to="/" tag="h2">
      <span>圖文產生器工廠</span>
    </router-link>
  </md-toolbar>
  <div id="app" class="container">
    <md-layout md-align="center">
      <router-view></router-view>
    </md-layout>
  </div>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
