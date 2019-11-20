<template>
  <div class="settings">
    <h1 class="settings__headline">Settings</h1>
    <section class="settings__options">
      <input type="text" v-model="name" placeholder="Name" class="settings__input" />
      <input type="text" v-model="userId" placeholder="Export value (User ID)" class="settings__input" />
    </section>
  </div>
</template>

<script>
export default {
  name: "settings",
  computed: {
    name: {
      get() {
        return this.$store.getters["user/name"];
      },
      set(value) {
        this.$store.dispatch("user/setName", value);
      }
    },
    userId: {
      get() {
        return this.$store.getters["user/exportValue"];
      },
      set(value) {
        this.$store.dispatch("user/setExportValue", value);
      }
    }
  }
};
</script>

<style lang="scss">
.settings {
  &__headline {
    max-width: 768px;
    margin: 0 auto 30px;
  }

  &__options {
    display: flex;
    flex-direction: column;
    max-width: 768px;
    margin: 0 auto;
  }

  &__input {
    font-size: 18px;
    padding: 10px;
    border: 0;
    color: #272727;
    margin-bottom: 5px;
  }

  &__button {
    border: 0;
    color: #272727;
    background: transparent;
    padding: 20px;
    font-size: 18px;
    cursor: pointer;
    display: block;
    margin: auto;

    &:hover {
      background: #272727;
      color: #fff;
    }
  }
}
</style>