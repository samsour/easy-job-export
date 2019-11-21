<template>
  <div class="current-booking">
    <ul>
      <li v-for="entry in currentBooking" :key="entry.id">
        {{ entry.data.projectId }}
        {{ entry.data.taskId }}
        {{ entry.data.description }}
        {{ entry.data.date }}
        {{ entry.data.time }}
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