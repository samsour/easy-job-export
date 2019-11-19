<template>
  <div class="settings">
    <h1 class="settings__headline">Settings</h1>
    <input type="text" v-model="name" placeholder="Name" class="settings__input" />
    <input type="text" v-model="userId" placeholder="Export value" class="settings__input" />
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
.create-new {
  &__headline {}
}
</style>