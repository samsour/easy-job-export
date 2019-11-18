<template>
  <div class="home">
    <p class="home__greetings">Hello, {{ userName }}!</p>
    <router-link tag="button" to="/new">
      Neue Buchung
    </router-link>
    <router-link tag="button" to="/settings">
      Einstellungen
    </router-link>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    userName() {
      return this.$store.getters["user/name"];
    }
  },
  data() {
    return {}
  }
};
</script>

<style lang="scss">
.home {
}
</style>