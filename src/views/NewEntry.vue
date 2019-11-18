<template>
  <div class="new-entry">
    <search
      v-for="(field, index) in visibleFields"
      :key="index"
      :field="field.name"
      :filterData="field.data"
      @changeSearchState="setSearchState"
      :isActive="field.name == activeSearch"
      :autoFill="field.autoFill ? field.autoFill : null"
      @autoFill="autoFill"
      v-model="entry[field.name]"
    />
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
      customers: "customer/customers"
    }),
    filteredProjects() {
      if (this.entry["customer"]) {
        return this.$store.getters["project/customerProjects"](this.entry["customer"].id);
      } else {
        return this.$store.getters["project/projects"];
      }
    },
    filteredTasks() {
      if (this.entry["project"]) {
        return this.$store.getters["project/projectTasks"](this.entry["project"].id);
      } else {
        return  this.$store.getters["project/tasks"]
      }
    },
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
          data: this.filteredProjects,
          autoFill: "customer"
        },
        {
          name: "task",
          data: this.filteredTasks,
          autoFill: "project"
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
    transform() {
      const fieldNames = this.fields.filter(field => field.export !== false).map(field => field.name);
      const options = { fields: fieldNames, quote: "", delimiter: "|" };

      // todo refactor
      this.entry["resId"] = { exportValue: this.userId };
      const exportEntry = {};

      for (const fieldName of fieldNames) {
        exportEntry[fieldName] = this.entry[fieldName].exportValue;
      }

      try {
        const parser = new Parser(options);
        const result = parser.parse(exportEntry);
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    setSearchState({ field, state }) {
      if (this.activeSearch != field || this.activeSearch == field && state == true) {
        this.activeSearch = field;
      } else {
        this.activeSearch = null;
      }
    },
    autoFill({ autoFill, item }) {
      // get full history of object
      //console.log("get full history of", autoFill, "by", item);
      if (!this.entry[autoFill]) {
        //console.log("previous is not set");
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