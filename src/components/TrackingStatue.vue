<template>
  <span v-if="!flightsStore.tracking">Tracking paused</span>
  <span v-if="flightsStore.tracking">Currently tracking</span>
  <v-badge v-if="flightsStore.tracking" :content="flightsStore.flights.length + ' flights'" inline />
  <v-badge v-if="flightsStore.tracking" content="1 instances" inline />
  <v-badge v-if="flightsStore.tracking" content="1 worlds" inline />
  <v-badge :content="currentZuluTime" inline />
</template>

<script lang="ts">
import { useFlightsStore } from "@/stores/flights";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      currentDate: new Date(),
      currentZuluTime: "",
      dateUpdateInterval: 0,
    };
  },
  mounted() {
    this.updateDate();
    this.dateUpdateInterval = setInterval(this.updateDate, 1000);
  },
  beforeUnmount() {
    clearInterval(this.dateUpdateInterval);
  },
  methods: {
    updateDate() {
      this.currentDate = new Date();
      this.currentZuluTime = this.getZuluTime();
    },
    getZuluTime(): string {
      return `${this.currentDate.getUTCFullYear()}-${
        this.currentDate.getUTCMonth() + 1
      }-${
        this.currentDate.getUTCDate() + 1
      }T${this.currentDate.getUTCHours()}:${this.currentDate.getUTCMinutes()}:${this.currentDate
        .getUTCSeconds()
        .toString()
        .padStart(2, "0")}z`;
    },
  },
  computed: {
    ...mapStores(useFlightsStore),
  },
});
</script>
