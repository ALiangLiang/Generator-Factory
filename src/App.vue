<template>
<v-app id="app" class="elevation-1" top-toolbar left-fixed-sidebar>
  <header>
    <v-toolbar class="orange">
      <v-toolbar-side-icon @click.native.stop="isSidebarOpened = !isSidebarOpened"></v-toolbar-side-icon>
      <v-toolbar-title>圖文產生器工廠</v-toolbar-title>
      <v-toolbar-items class="hidden-md-and-down">
        <v-toolbar-item ripple>來去組裝產生器</v-toolbar-item>
        <v-toolbar-item ripple>產生器型號目錄</v-toolbar-item>
        <v-toolbar-item ripple>各式圖文產品</v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
  </header>

  <main>

    <div class="container">
      <md-layout md-align="center">
        <router-view></router-view>
      </md-layout>
    </div>

    <v-sidebar v-model="isSidebarOpened" fixed>
      <v-list dense>
        <v-list-item>
          <v-list-tile href="/">
            <v-list-tile-avatar>
              <!-- <v-icon>{{ item.avatar }}</v-icon> -->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>來去組裝產生器</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
        <v-list-item>
          <v-list-tile href="/generatorMenu">
            <v-list-tile-avatar>
              <!-- <v-icon>{{ item.avatar }}</v-icon> -->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>產生器型號目錄</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
        <v-list-item>
          <v-list-tile href="/productMenu">
            <v-list-tile-avatar>
              <!-- <v-icon>{{ item.avatar }}</v-icon> -->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>各式圖文產品</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-sidebar>
  </main>
</v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isSidebarOpened: false
    }
  },
  mounted() {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 960px;
}

.container {
  padding: 16px;
}

.md-sidenav-content {
  top: 0px;
  position: fixed !important;
}
</style>
