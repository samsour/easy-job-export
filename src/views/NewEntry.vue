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
    
    <div class="new-entry__item">
      <date-pick
        v-model="date"
        :format="'MM/DD/YYYY'"
        :displayFormat="'DD.MM.YYYY'"
      ></date-pick>
    </div>

    <div class="new-entry__item">
      <vue-timepicker
        v-model="time"
        name="time"
        format="H.m"
        :minute-interval="15"
        close-on-complete
        placeholder="Zeit"
        hour-label="Stunden"
        minute-label="Minuten"
        input-class="new-entry__input new-entry__input--time"
      ></vue-timepicker>
    </div>
    
    <div class="new-entry__item">
      <textarea v-model="description" />
    </div>

    <button @click="saveEntry" class="new-entry__button">Speichern</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from "@/components/Search";
import VueTimepicker from 'vue2-timepicker/dist/VueTimepicker.umd.min.js';
import DatePick from 'vue-date-pick';

export default {
  name: "new",
  components: {
    Search,
    VueTimepicker,
    DatePick
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
          name: "userId",
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
  data: () => ({
    activeSearch: null,
    entry: {},
    description: "",
    date: "",
    time: {
      H: "",
      m: ""
    }
  }),
  methods: {
    generateId() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
    },
    saveEntry() {
      // check if properties are set - description may be empty
      if(
        this.userId
        && Object.keys(this.entry).length > 0
        && this.entry.project && this.entry.project.exportValue
        && this.entry.task && this.entry.task.exportValue
        && this.date
        && this.time.H > 0 || this.time.m > 0
      ) {
        const entry = {
          created: Date.now(),
          id: this.generateId(),
          data: {
            userId: this.userId,
            projectId: this.entry.project.exportValue,
            taskId: this.entry.task.exportValue,
            date: this.date,
            time: parseInt(this.time.H) + parseFloat(this.time.m / 60),
            description: this.description
          }
        }
        this.$store.dispatch("booking/addEntry", entry);
        this.$router.push("/current-booking");
      } else {
        console.error("Missing entries");
      }
    }
  },
  mounted() {
    const date = new Date();
    this.date = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
  }
};
</script>

<style lang="scss" scoped>
@import '~vue2-timepicker/dist/VueTimepicker.css';
@import '~vue-date-pick/dist/vueDatePick.css';

.new-entry {
  &__headline {
    color: red;
  }

  &__item {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #f7f7f7;
    }
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