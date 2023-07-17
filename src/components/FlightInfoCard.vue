<template>
  <v-card class="flight-info-card">
    <v-img src="/a320.webp" />
    <v-card-item>
      <v-card-title>{{ flight?.callsign }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ flight?.registration }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col cols="1">
          <v-icon icon="mdi-airplane" size="x-large" />
        </v-col>
        <v-col cols="11">
          <div style="margin-left: 1.2rem">
            <v-row>
              <p class="text-caption text-medium-emphasis">
                AIRCRAFT TYPE ({{ flight?.typeCode }})
              </p>
              <v-divider />
              <p class="text-subtitle-1">A320-251N</p>
            </v-row>
            <v-row>
              <p class="text-caption text-medium-emphasis">REGISTRATION</p>
              <v-divider />
              <p class="text-subtitle-1">
                {{ flight?.registration }}
              </p>
            </v-row>
          </div>
        </v-col>
        <v-col cols="1">
          <v-icon icon="mdi-altimeter" size="x-large" />
        </v-col>
        <v-col cols="11">
          <div style="margin-left: 0.5rem">
            <v-row no-gutters>
              <v-col>
                <p class="text-caption text-medium-emphasis">ALTITUDE</p>
                <v-divider />
                <p class="text-subtitle-1">
                  {{ flight?.altitude.toLocaleString() }} ft
                </p>
              </v-col>
              <v-col>
                <p class="text-caption text-medium-emphasis">VERTICAL SPEED</p>
                <v-divider />
                <p class="text-subtitle-1">0 fpm</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <p class="text-caption text-medium-emphasis">TRACK</p>
                <v-divider />
                <p class="text-subtitle-1">{{ flight?.heading }}°</p>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="1">
          <v-icon icon="mdi-speedometerSlow" size="x-large" />
        </v-col>
        <v-col cols="11">
          <div style="margin-left: 0.5rem">
            <v-row no-gutters>
              <v-col>
                <p class="text-caption text-medium-emphasis">GROUND SPEED</p>
                <v-divider />
                <p class="text-subtitle-1">{{ flight?.groundspeed }} kts</p>
              </v-col>
              <v-col>
                <div>
                  <p class="text-caption text-medium-emphasis">TRUE AIRSPEED</p>
                  <v-divider />
                  <p class="text-subtitle-1">{{ flight?.groundspeed }} kts</p>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <p class="text-caption text-medium-emphasis">IAS</p>
                <v-divider />
                <p class="text-subtitle-1">{{ flight?.groundspeed }} kts</p>
              </v-col>
              <v-col>
                <p class="text-caption text-medium-emphasis">MACH</p>
                <v-divider />
                <p class="text-subtitle-1">N/A</p>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="1">
          <v-icon icon="mdi-spaceStation" size="x-large" />
        </v-col>
        <v-col cols="11">
          <div style="margin-left: 0.5rem">
            <v-row no-gutters>
              <v-col>
                <p class="text-caption text-medium-emphasis">WORLD ID</p>
                <v-divider />
                <p class="text-subtitle-1">
                  {{ flight?.worldId }}
                </p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <div>
                  <p class="text-caption text-medium-emphasis">INSTANCE ID</p>
                  <v-divider />
                  <p class="text-subtitle-1">
                    {{ flight?.instanceId }}
                  </p>
                </div>
              </v-col>
              <v-col>
                <p class="text-caption text-medium-emphasis">SQUAWK</p>
                <v-divider />
                <p class="text-subtitle-1">2000</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <p class="text-caption text-medium-emphasis">LATITUDE</p>
                <v-divider />
                <p class="text-subtitle-1">{{ flight?.latitude }}</p>
              </v-col>
              <v-col>
                <p class="text-caption text-medium-emphasis">LATITUDE</p>
                <v-divider />
                <p class="text-subtitle-1">{{ flight?.longitude }}</p>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type Flight from '../types/Flight';

defineProps<{
  flight: Flight
}>();
</script>

<style>
.flight-info-card {
  height: 80vh;
  max-height: 780px;
  overflow: auto !important;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.flight-info-card::-webkit-scrollbar {
  display: none;
}
</style>
