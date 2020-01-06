<template>
  <div class="home">
    <div class="home__header">
      <p class="home__greetings">Hallo, {{ userName }}!</p>
    </div>
    <div class="home__items">
      <router-link tag="button" to="/new" class="home__item">
        Neue Buchung
      </router-link>
      <router-link tag="button" to="/current-booking" class="home__item">
        Aktuelle Buchung
      </router-link>
      <router-link tag="button" to="/settings" class="home__item">
        Einstellungen
      </router-link>
    </div>
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
  &__header {
    padding: 0 30px;
    font-size: 18px;
    max-width: 768px;
    margin: 0 auto 30px;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    max-width: 768px;
    margin: 0 auto;
  }

  &__item {
    display: block;
    flex: 0 1 50%;
    border: 0;
    padding: 20px;
    height: 150px;
    font-size: 18px;
    font-weight: bold;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:nth-child(4n-2), &:nth-child(4n-1){
      background-color: #f7f7f7;
    }

    &:hover {
      background-color: #bbb;
    }
  }
}
</style>