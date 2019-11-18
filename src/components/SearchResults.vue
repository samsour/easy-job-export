<template>
  <label class="search-results">
    <ul v-if="filterData && filteredArray.length > 0" class="search-results__list">
      <li v-for="(item, index) in filteredArray" :key="index" @click="$emit('itemSelect', item)" class="search-results__list-item">
        <h4 class="search-results__result-title">{{ item.name }}</h4>
      </li>
    </ul>
    <span v-else>{{ noResultMessage }}</span>
  </label>
</template>

<script>
export default {
  name: "search-label",
  props: {
    filterData: Array,
    searchText: String
  },
  computed: {
    filteredArray() {
      return this.filterData.filter(item => {
        return item.name.toLowerCase().includes(this.searchText.toLowerCase())
      })
    }
  },
  data() {
      return {
          noResultMessage: "Keine Suchergebnisse"
      }
  }
};
</script>

<style lang="scss" scoped>
.search-results {
    &__list {
      display: block;
      list-style-type: none;
      width: 50vw;
      margin: 20px auto 40px;
    }
  
    &__list-item {
        display: flex;
        padding: 10px;
        cursor: pointer;

        &:hover {
            background: #f7f7f7;
        }
    }
}
</style>