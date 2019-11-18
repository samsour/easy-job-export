<template>
  <div class="new-entry">
    <!-- TODO Refactor add right filter data -->
    <search v-for="(field, index) in visibleFields" :key="index" :field="field.name" :filterData="field.data" @itemSelect="setEntry" @changeSearchState="setSearchState" :isActive="field.name == activeSearch" />

    <!-- <search :field="'project'" :filterData="projects" @itemSelect="setEntry" @changeSearchState="setSearchState" />
    <search :field="'task'" :filterData="tasks" @itemSelect="setEntry" @changeSearchState="setSearchState" /> -->

    <button @click="transform(entry)" class="new-entry__button">Export to csv</button>
  </div>
</template>

<script>
import { Parser } from "json2csv";
import { mapGetters } from 'vuex'
import Search from "@/components/Search";

export default {
  name: "new",
  components: {
    Search
  },
  computed: {
    ...mapGetters({
      userId: "user/exportValue",
      customers: "customer/customers",
      projects: "project/projects",
      tasks: "project/tasks"
    }),
    fields() {
      return [
        {
          name: "resId",
          data: this.userId,
          visible: false
        },
        {
          name: "customer",
          data: this.customers,
          export: false
        },
        {
          name: "project",
          data: this.projects
        },
        {
          name: "task",
          data: this.tasks
        },
      ];
    },
    visibleFields() {
      return this.fields.filter(field => field.visible !== false);
    }
  },
  data() {
    return {
      // fields: ["resId", "project", "taskId", "date", "description", "time"],
      activeSearch: null,
      entry: {}
    };
  },
  methods: {
    transform(obj) {
      const opts = { fields: this.fields, quote: "", delimiter: "|" };

      // add missing properties
      const entry = obj;
      entry["resId"] = this.resId;

      try {
        const parser = new Parser(opts);
        const result = parser.parse(entry);
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    setEntry({ field, item }) {
      this.entry[field] = item.exportValue;
    },
    setSearchState({ field, state }) {
      if (this.activeSearch != field || this.activeSearch == field && state == true) {
        this.activeSearch = field;
      } else {
        this.activeSearch = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.new-entry {
  &__headline {
    color: red;
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