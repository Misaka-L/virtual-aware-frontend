<template>
  <div class="flight-info">
    <v-btn @click="flightsStore.reset" prepend-icon="mdi-arrow-left" class="mb-3" rounded="xl">Back</v-btn>
    <FlightInfoCard :flight="selectedFlight" v-if="selectedFlight != null" />
    <v-expansion-panels v-if="selectedFlight == null">
      <v-expansion-panel title="Flights">
        <v-expansion-panel-text>
          <v-list density="compact">
            <v-list-item v-for="flight in flightsStore.flights" :key="flight.id" :title="flight.callsign"
              :value="flight.id" @click="selectedFlightId = flight.id">
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <l-map @click="onMapClick" @move="onMapMove" :min-zoom="minZoom" :max-zoom="maxZoom" v-model:zoom="zoom"
    :use-global-leaflet="false" :options="{ attributionControl: false, zoomControl: false }" :crs="crs" :center="[0, 0]">
    <l-control-attribution position="bottomright"
      prefix="Map Data © <a href='https://yuxiaviation.com/'>VRChat Aerospace University</a> | VRChatFlightRadar | Powered by <a href='https://leafletjs.com/'>Leaflet</a>" />
    <l-control-zoom position="bottomright" zoom-in-text="+" zoom-out-text="-" />
    <l-image-overlay url="/VAU.jpg" :bounds="[
      [-2160, -3480],
      [2160, 3480],
    ]" />
    <l-marker v-for="flight in flightsStore.flights" :lat-lng="[flight.latitude, flight.longitude]" :key="flight.id"
      @click="selectedFlightId = flight.id">
      <l-icon>
        <div style="display: flex" :class="{ 'selected-flight': selectedFlightId == flight.id }">
          <v-icon icon="mdi-airplane" :color="selectedFlightId == flight.id
            ? 'yellow-darken-4'
            : 'blue-darken-2'
            " size="x-large" class="flight-marker-icon"
            :style="'transform: rotate(' + (flight.heading - 45) + 'deg)'" />
          <div class="flight-tag">
            <span>{{ flight.callsign }}</span>
          </div>
        </div>
      </l-icon>
    </l-marker>
  </l-map>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { useFlightsStore } from "../stores/flights";
import FlightInfoCard from "./FlightInfoCard.vue";
import {
  LMap,
  LMarker,
  LIcon,
  LImageOverlay,
  LControlZoom,
  LControlAttribution,
} from "@vue-leaflet/vue-leaflet";
import { CRS } from "leaflet/dist/leaflet-src.esm";
import { ref } from "vue";
import { computed } from "vue";
import Flight from "../types/Flight";
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";

const zoom = ref(-2);
const minZoom = ref(-5);
const maxZoom = ref(0);
const crs = ref(CRS.Simple);
const selectedFlightId = ref("");
const isMapMove = ref(false);

const flightsStore = useFlightsStore();
const selectedFlight = computed(() => flightsStore.flights.find((flight: Flight) => flight.id == selectedFlightId.value));

function onMapClick() {
  if (!isMapMove) selectedFlightId.value = "";
  isMapMove.value = false;
}

function onMapMove() {
  isMapMove.value = true;
}

onMounted(() => flightsStore.startUpdate())
onBeforeUnmount(() => flightsStore.stopUpdate())
</script>

<style lang="scss">
.leaflet-marker-icon {
  background: transparent;
  border: transparent;
}

.flight-tag {
  display: flex;
  margin: 0 3px;
  padding: 0 5px;
  border-radius: 8px;
  background-color: rgba(25, 117, 210, 0.67);
  color: white;

  span {
    display: flex;
    align-items: center;
  }
}

.flight-info {
  position: absolute;
  margin: 1rem;
  width: 20rem;
  z-index: 600;
}

.selected-flight .flight-tag {
  background-color: rgba(245, 127, 23, 0.67);
}

.leaflet-container {
  background-color: black;
}

.flight-marker-icon svg {
  height: 24px;
  width: 24px;
}
</style>
