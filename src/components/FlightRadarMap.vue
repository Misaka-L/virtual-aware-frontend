<template>
  <div class="flight-info">
    <FlightInfoCard :flight="selectedFlight" v-if="selectedFlight != null" />
    <v-expansion-panels v-if="selectedFlight == null">
      <v-expansion-panel title="Flights">
        <v-expansion-panel-text>
          <v-list density="compact">
            <v-list-item
              v-for="flight in flightsStore.flights"
              :key="flight.id"
              :title="flight.callsign"
              :value="flight.id"
              @click="selectedFlightId = flight.id"
            >
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel
        title="Title"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
      >
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <l-map
    ref="map"
    @click="onMapClick"
    @move="onMapMove"
    :min-zoom="minZoom"
    :max-zoom="maxZoom"
    v-model:zoom="zoom"
    :options="{ attributionControl: false, zoomControl: false }"
    :crs="crs"
    :center="[0, 0]"
  >
    <l-control-attribution
      position="bottomright"
      prefix="Map Data © <a href='https://yuxiaviation.com/'>VRChat Aerospace University</a> | VRChatFlightRadar | Powered by <a href='https://leafletjs.com/'>Leaflet</a>"
    />
    <l-control-zoom position="bottomright" zoom-in-text="+" zoom-out-text="-" />
    <l-image-overlay
      url="/VAU.jpg"
      :bounds="[
        [-2160, -3480],
        [2160, 3480],
      ]"
    />
    <l-marker
      v-for="flight in flightsStore.flights"
      :lat-lng="[flight.latitude, flight.longitude]"
      :key="flight.id"
      @click="selectedFlightId = flight.id"
    >
      <l-icon>
        <div
          style="display: flex"
          :class="{ 'selected-flight': selectedFlightId == flight.id }"
        >
          <v-icon
            icon="$airplane"
            :color="
              selectedFlightId == flight.id
                ? 'yellow-darken-4'
                : 'blue-darken-2'
            "
            size="x-large"
            class="flight-marker-icon"
            :style="'transform: rotate(' + (flight.heading - 45) + 'deg)'"
          />
          <div class="flight-tag">
            <span>{{ flight.callsign }}</span>
          </div>
        </div>
      </l-icon>
    </l-marker>
  </l-map>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css";
import { defineComponent } from "vue";
import { useFlightsStore } from "@/stores/flights";
import FlightInfoCard from "./FlightInfoCard.vue";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LImageOverlay,
  LControlZoom,
  LControlAttribution,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import { CRS } from "leaflet/dist/leaflet-src.esm";
import { mapStores } from "pinia";
import type Flight from "@/types/Flight";

export default defineComponent({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LImageOverlay,
    LControlZoom,
    LControlAttribution,
    LTooltip,
    FlightInfoCard,
  },
  data() {
    return {
      zoom: -2,
      minZoom: -5,
      maxZoom: 0,
      timer: 0,
      crs: CRS.Simple,
      selectedFlightId: "",
      isMapMove: false,
    };
  },
  computed: {
    ...mapStores(useFlightsStore),
    selectedFlight(): Flight | undefined {
      return this.flightsStore.flights.find(
        (flight) => flight.id == this.selectedFlightId
      );
    },
  },
  mounted() {
    this.startUpdate();
  },
  methods: {
    startUpdate() {
      this.flightsStore.tracking = true;
      this.timer = setTimeout(async () => {
        try {
          var response = await fetch("/api/flightradar/list");
          this.flightsStore.flights = await response.json();
        } catch {}

        this.startUpdate();
      }, 2000);
    },
    onMapClick() {
      if (!this.isMapMove) this.selectedFlightId = "";
      this.isMapMove = false;
    },
    onMapMove() {
      this.isMapMove = true;
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
    this.flightsStore.tracking = false;
  },
});
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
