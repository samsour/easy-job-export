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
  }
}
</script>

<style>

</style>