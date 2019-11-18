<template>
  <div @mousedown="$refs.searchInput.focus()" :class="{'is-active': isActive}" class="search-input">
    <div class="search-input__content">
      <span class="search-input__title">{{ field }}</span>
      <input :value="value" @focus="$emit('searching', true)" @blur="$emit('searching', false)" ref="searchInput" @input="$emit('input', $event.target.value)" type="search" required class="search-input__input" />
    </div>
  </div>
</template>

<script>
export default {
  name: "search-input",
  props: {
    field: String,
    value: String,
    isActive: Boolean
  }
};
</script>

<style lang="scss" scoped>
.search-input {
    $root: &;
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 70px 0px;
    cursor: pointer;
    
    &:hover, &.is-active {
      background: #F7F7F7;
    }
  
  &__content {
    width: 50vw;
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 0%;
      height: 2px;
      position: relative;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background: currentColor;
      transition: .2s ease all .1s;
      margin-top: 5px;

      #{$root}.is-active & {
        width: 100%;
      }
    }
  }

  &__title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    transition: all .2s ease;
    cursor: text;
    pointer-events: none;

    #{$root}.is-active &, &:invalid{
      font-size: 16px;
      left: 0;
      top: -80%;
      transform: none;
    }
  }

  &__input {
    display: block;
    width: 50vw;
    border: 0;
    margin: 0 auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #282828;
    font-size: 24px;
    background: transparent;

    &:focus {
      outline: 0;

    }
  }
}
</style>