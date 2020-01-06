<template>
  <div id="app">
    <navigation-bar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar';

export default {
  name: 'app',
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss">
*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #272727;
  min-height: 100vh;
}

input {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
