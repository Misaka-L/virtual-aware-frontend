<template>
  <v-app>
    <v-layout>
      <v-system-bar window>
        <v-icon icon="mdi-radar" class="me-2" />
        <span>VirtualAware</span>
        <v-spacer />
        <TrackingStatue />

      </v-system-bar>
      <v-navigation-drawer rail expand-on-hover>

        <v-list density="compact" nav>
          <v-list-item title="Radar" to="/" prepend-icon="mdi-radar" nav />
          <v-list-item title="Analytics" to="/analytics" prepend-icon="mdi-poll" nav />
          <v-list-item title="Event" to="/event" prepend-icon="mdi-calendar" nav />
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import TrackingStatue from './components/TrackingStatue.vue';
</script>
