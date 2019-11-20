<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
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
  padding-top: 60px;
  min-height: 100vh;
  background: linear-gradient(to bottom right, rgba(rgb(133, 167, 220), 0.38), rgba(#E5E5E5, 0.38));
  background-size: 200%;
  background-position: 100%;
  animation: background-animation infinite 15s;
}

@keyframes background-animation {
    0% {
        background-position: 0%
    }
    50% {
        background-position: 100%;
    }
    100% {
        background-position: 0%;
    }
}
</style>
