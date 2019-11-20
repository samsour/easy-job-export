<template>
  <label class="search-results">
    <ul v-if="filterData && filteredArray.length > 0" class="search-results__list">
      <li v-for="(item, index) in filteredArray" :key="index" @click="$emit('itemSelect', item)" class="search-results__list-item">
        <figure class="search-results__result">
          <div v-if="item.image" class="search-results__image-wrapper">
            <img :src="item.image" class="search-results__result-image">
          </div>
          <figcaption class="search-results__result-title">{{ item.name }}</figcaption>
        </figure>
      </li>
    </ul>
    <div v-else class="search-results__message-container">
      <span class="search-results__message">{{ noResultMessage }}</span>
    </div>
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
        cursor: pointer;

        &:hover {
            background: #f7f7f7;
        }
    }

    &__result {
      display: flex;
      padding: 10px;
      align-items: center;
    }

    &__image-wrapper {
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }

    &__result-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__message-container {
      max-width: 720px;
      margin: 0 auto;
      padding: 20px 0;
    }
}
</style>