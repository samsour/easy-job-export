<template>
  <div class="settings">
    <settings-option :label="'Name'" v-model="name" :overlayText="'Only for display purposes, he username won\'t be exported.'" />
    <settings-option :label="'Export value'" v-model="userId" :overlayText="'Resource/User ID, the unique identifier in the import system.'" />
    <router-link to="/manage" class="settings__link">Manage customer data</router-link>
  </div>
</template>

<script>
import SettingsOption from '../components/SettingsOption';

export default {
  name: "settings",
  components: {
    SettingsOption
  },
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
  padding: 0 30px;

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

  &__link {
    display: inline-block;
    margin-left: 30px;
    color: #282828;
    font-size: 18px;
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
  }
}
</style>