<template>
  <div class="settings-option">
      <button @mousedown="isActive = !isActive" @blur="isActive = false" class="settings-option__info-button">i</button>
      <div v-show="isActive" class="settings-option__info-overlay">{{ overlayText }}</div>
      <label class="settings-option__label">
          <span class="settings-option__label-text">{{ label }}</span>
          <input class="settings-option__label-input" :value="value" @input="$emit('input', $event.target.value)" />
      </label>
  </div>
</template>

<script>
export default {
    name: 'settings-option',
    props: ["value", "label", "overlayText"],
    data() {
        return {
            isActive: false
        }
    }
}
</script>

<style lang="scss">
.settings-option {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &__info-button {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 0;
        background: #f7f7f7;
        color: #bbb;
        margin-right: 20px;
        cursor: pointer;
    }

    &__info-overlay {
        position: absolute;
        top: 0;
        left: 40px;
        padding: 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        z-index: 1;
    }

    &__label {
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }

    &__label-text {
        color: #bbb;
        font-size: 16px;
        font-weight: 700px;
    }

    &__label-input {
        color: #282828;
        font-size: 18px;
        border: 0;
        font-weight: bold;
    }
}
</style>