import type Flight from "../types/Flight"

const baseUrl = "https://cdnapi.misakal.xyz/virtualaware"

export async function getFlights(instanceId: string, worldId: string) {
  var flightResponse = await fetch(
    `${baseUrl}/flightradar/list?instanceId=${instanceId}&worldId=${worldId}`
  )

  return (await flightResponse.json()) as Flight[]
}

export async function getInstances(worldId: string) {
  return (await (
    await fetch(`${baseUrl}/flightradar/instances?worldId=${worldId}`)
  ).json()) as string[]
}

export async function getWorlds() {
  return (await (
    await fetch(`${baseUrl}/flightradar/worlds`)
  ).json()) as string[]
}
