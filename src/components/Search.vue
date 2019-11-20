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
        isActive: Boolean,
        autoFill: String
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
            this.$emit('input', item);
            if ( this.autoFill !== null) {
                console.log(this.autoFill);
                this.$emit('autoFill', { autoFill: this.autoFill, item: item });
            }
        },
        changeSearchState(state) {
            this.$emit('changeSearchState', { state: state, field: this.field });
        }
    }
}
</script>