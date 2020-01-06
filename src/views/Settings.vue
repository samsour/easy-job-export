<template>
  <div class="settings">
    <section class="settings__options">

    <settings-option :label="'Name'" v-model="name" :overlayText="'Only for display purposes, he username won\'t be exported.'" />
    <settings-option :label="'Export value'" v-model="userId" :overlayText="'Resource/User ID, the unique identifier in the export system.'" />
    
    </section>
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

  &__label {
    display: flex;
    flex-direction: column;
  }

  &__input {
    font-size: 18px;
    padding: 10px;
    border: 0;
    border-bottom: 3px solid #000;
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