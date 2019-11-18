<template>
  <section class="search">
      <search-input v-model="searchText" :isActive="isActive" @searching="changeSearchState" :field="field" />
      <search-results v-show="isActive" @itemSelect="selectItem" :searchText="searchText" :filterData="filterData" />
  </section>
</template>

<script>
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

export default {
    name: "search",
    components: {
        SearchInput,
        SearchResults
    },
    props: {
        field: String,
        filterData: Array,
        isActive: Boolean
    },
    data() {
        return {
            searchText: ""
        }
    },
    methods: {
        selectItem(item) {
            this.searchText = item.name;
            this.changeSearchState(false);
            this.$emit('itemSelect', { field: this.field, item: item });
        },
        changeSearchState(state) {
            this.$emit('changeSearchState', { state: state, field: this.field });
        }
    }
}
</script>

<style lang="scss">

</style>