<template>
  <span v-if="!flightsStore.tracking">Tracking paused</span>
  <span v-if="flightsStore.tracking">Currently tracking</span>
  <v-badge v-if="flightsStore.tracking" :content="flightsStore.flights.length + ' flights'" inline />
  <v-badge :content="currentZuluTime" inline />
</template>

<script lang="ts" setup>
import { useFlightsStore } from "../stores/flights";
import { Ref } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";

const currentDate = ref(new Date());
const currentZuluTime = ref("");
const dateUpdateInterval: Ref<any> = ref(undefined);

const flightsStore = useFlightsStore();

onMounted(() => {
  updateDate();
  dateUpdateInterval.value = setInterval(updateDate, 1000)
});

function updateDate() {
  currentDate.value = new Date();
  currentZuluTime.value = getZuluTime();
}

function getZuluTime(): string {
  return `${currentDate.value.getUTCFullYear()}-${currentDate.value.getUTCMonth() + 1
    }-${currentDate.value.getUTCDate() + 1
    }T${currentDate.value.getUTCHours()}:${currentDate.value.getUTCMinutes()}:${currentDate
      .value.getUTCSeconds()
      .toString()
      .padStart(2, "0")}z`;
}
</script>
