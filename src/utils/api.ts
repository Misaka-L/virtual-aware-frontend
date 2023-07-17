import type Flight from "../types/Flight"

const baseUrl = "/api"

export async function getFlights(instanceId: string, worldId: string) {
  var flightResponse = await fetch(
    `${baseUrl}/flightradar/list?instanceId=${instanceId}&worldId=${worldId}`
  )

  return (await flightResponse.json()) as Flight[]
}

export async function getInstances(worldId: string) {
  return (await (
    await fetch(`/api/flightradar/instances?worldId=${worldId}`)
  ).json()) as string[]
}

export async function getWorlds() {
  return (await (await fetch("/api/flightradar/worlds")).json()) as string[]
}
