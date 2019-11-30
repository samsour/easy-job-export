<template>
  <div class="current-booking">
    <ul>
      <li v-for="entry in currentBooking" :key="entry.id">
        <div v-if="Object.keys(entry).length > 0" class="">
          {{ entry.data.projectId }}
          {{ entry.data.taskId }}
          {{ entry.data.description }}
          {{ entry.data.date }}
          {{ entry.data.time }}
          <button @click="duplicateEntry(entry)">duplicate</button>
          <button @click="removeEntry(entry.id)">remove</button>
        </div>
        <span v-else class="message">some empty object in the store</span>
      </li>
    </ul>
    <button @click="exportDropdownIsActive = !exportDropdownIsActive">Export</button>
    <div v-show="exportDropdownIsActive" class="current-booking__export-dropdown">
      <button class="current-booking__export-button" disabled>JSON</button>
      <button class="current-booking__export-button" disabled>E-Mail</button>
      <button @click="exportToCsv" class="current-booking__export-button">CSV</button>
    </div>
    <section v-if="exportedData" class="current-booking__result">
      <textarea v-model="exportedData" ref="exportTextarea" class="current-booking__result-textarea" />
      <button class="current-booking__button" @click="copyExportedData">Copy</button>
    </section>
  </div>
</template>

<script>
import { Parser } from "json2csv";
import { mapGetters } from 'vuex'

export default {
  name: "current-booking",
  computed: {
    ...mapGetters({
      currentBooking: "booking/current",
    })
  },
  data: () => ({
    exportDropdownIsActive: false,
    exportedData: undefined
  }),
  methods: {
    generateId() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    removeEntry(id) {
      this.$store.dispatch("booking/removeEntry", id);
    },
    duplicateEntry(entry) {
      console.log("duplicate", entry);
      // get old date
      const date = new Date(entry.data.date);
      // increment old date
      date.setDate(date.getDate() + 1)

      // build new date string
      const monthString = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1;
      const dayString = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const convertedDate =`${monthString}/${dayString}/${date.getFullYear()}`;

      const newEntry = {
        created: Date.now(),
          id: this.generateId(),
          data: {
            ...entry.data,
            date: convertedDate
          }
      }
      this.$store.dispatch("booking/addEntry", newEntry);
    },
    exportToCsv() {
      // dynamic construction
      // const fieldNames = Object.keys(this.currentBooking[0].data);
      // manual construction to ensure csv order
      const fieldNames = ["userId", "projectId", "taskId", "date", "description", "time"];
      const options = { fields: fieldNames, quote: "", delimiter: "|", header: false };

      const exportEntries = this.currentBooking.map(entry => entry.data);

      try {
        const parser = new Parser(options);
        const csv = parser.parse(exportEntries);
        
        this.exportedData = csv
      } catch (error) {
        console.error(error);
      }
    },
    copyExportedData() {
      this.$refs.exportTextarea.select();
      document.execCommand("copy");
    }
  }
}
</script>

<style lang="scss">
.current-booking {
  &__result {

  }

  &__result-textarea {
    display: block;
    width: 100%;
  }
}
</style>