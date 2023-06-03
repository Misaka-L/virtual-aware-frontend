<template>
  <v-app>
    <v-system-bar window>
      <v-icon icon="mdi-radar" class="me-2" />
      <span>VirtualAware</span>
      <v-spacer />
      <TrackingStatue />

    </v-system-bar>
    <v-navigation-drawer rail expand-on-hover>

      <v-list density="compact" nav>
        <v-list-item v-for="item in navigationItems" :key="item.value" :title="item.title" :to="item.value"
          :prepend-icon="item.icon" nav />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import TrackingStatue from './components/TrackingStatue.vue';

const navigationItems = ref([
  {
    title: "Radar",
    value: "/",
    icon: "$radar",
  },
  {
    title: "Analytics",
    value: "/analytics",
    icon: "$poll",
  },
  {
    title: "Event",
    value: "/event",
    icon: "$calendar",
  },
]);
</script>
