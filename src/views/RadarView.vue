<script setup lang="ts">
import FlightRadarMap from "../components/FlightRadarMap.vue";
import SelectInstance from "../components/SelectInstance.vue";
import { useFlightsStore } from "../stores/flights";

const flightStore = useFlightsStore();
</script>

<template>
  <div class="h-100 w-100">
    <FlightRadarMap v-if="flightStore.selectedWorldId != `` && flightStore.selectedInstanceId != ``" />
    <SelectInstance v-else />
  </div>
</template>