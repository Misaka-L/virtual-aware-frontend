import type Flight from "@/types/Flight";
import { defineStore } from "pinia";

export const useFlightsStore = defineStore("flights", {
  state: () => ({
    flights: [] as Flight[],
    tracking: false,
  }),
  getters: {
    getFlights: (state) => state.flights,
  },
});
