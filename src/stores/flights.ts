import { ref } from "vue"
import type Flight from "../types/Flight"
import { defineStore } from "pinia"
import { Ref } from "vue"
import { getFlights } from "../utils/api"

export const useFlightsStore = defineStore("flights", () => {
  const flights = ref([] as Flight[])
  const tracking = ref(false)
  const selectedWorldId = ref("")
  const selectedInstanceId = ref("")

  const timer: Ref<any> = ref(null)

  function startUpdate() {
    tracking.value = true
    timer.value = setTimeout(async () => {
      try {
        flights.value = await getFlights(
          selectedInstanceId.value,
          selectedWorldId.value
        )
      } catch {}

      startUpdate()
    }, 2000)
  }

  function stopUpdate() {
    tracking.value = false
    clearInterval(timer.value)
  }

  function reset() {
    stopUpdate()
    selectedInstanceId.value = ""
    selectedWorldId.value = ""
  }

  return {
    flights,
    tracking,
    selectedWorldId,
    selectedInstanceId,
    startUpdate,
    stopUpdate,
    reset,
  }
})
