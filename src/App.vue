<template>
<div>
  <md-toolbar class="md-dense">
    <md-button class="md-icon-button" @click.native="$refs.leftSidenav.toggle()">
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

  <md-sidenav class="md-left" ref="leftSidenav">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">圖文產生器工廠</h3>
      </div>
      <md-list>
        <md-list-item href="#/">
          <md-icon>build</md-icon> <span>來去組裝產生器</span>
        </md-list-item>
        <md-list-item href="#/generatorMenu">
          <md-icon>dashboard</md-icon> <span>產生器型號目錄</span>
        </md-list-item>
        <md-list-item href="#/productMenu">
          <md-icon>list</md-icon> <span>各式圖文產品</span>
        </md-list-item>
      </md-list>
    </md-toolbar>
  </md-sidenav>
</div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      generators: []
    }
  },
  mounted() {
    fetch('https://www.aliangliang.com.tw:8787/generators/')
      .then((res) => res.json())
      .then((json) => this.generators = json)
  }
}
</script>

<style>
/*@import "material-design-icons";*/

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
