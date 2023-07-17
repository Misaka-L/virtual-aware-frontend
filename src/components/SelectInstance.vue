<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFlightsStore } from '../stores/flights';
import { onMounted } from 'vue';
import { onBeforeUnmount } from 'vue';
import { getInstances, getWorlds } from '../utils/api';

const flightStore = useFlightsStore();

const worlds = ref([] as string[]);
const instances = ref([] as string[]);

const intervalId = ref(null as any);

onMounted(() => {
    intervalId.value = setInterval(async () => {
        worlds.value = await getWorlds()

        if (flightStore.selectedWorldId !== "") {
            instances.value = await getInstances(flightStore.selectedWorldId)
        }
    }, 1000)
})

onBeforeUnmount(() => {
    clearInterval(intervalId.value)
})

watch(() => flightStore.selectedWorldId, async () => {
    instances.value = await getInstances(flightStore.selectedWorldId)
});

function selectInstance(value: unknown[]) {
    const instanceIds = value as string[]
    if (instanceIds.length === 1) {
        flightStore.selectedInstanceId = instanceIds.at(0) as string
        return
    }

    flightStore.selectedInstanceId = ""
}
</script>

<template>
    <div class="h-100 w-100 d-flex align-center justify-center flex-column">
        <h2 class="text-h2 mb-5">Select a instance</h2>
        <div style="width: 300px;">
            <v-combobox label="Select a world" variant="solo-filled" :items="worlds"
                v-model="flightStore.selectedWorldId" />
        </div>
        <v-list width="300" height="400" @update:selected="selectInstance">
            <v-list-subheader>Instances</v-list-subheader>
            <v-list-subheader v-if="flightStore.selectedWorldId == ``">Select a world first</v-list-subheader>
            <v-list-subheader v-else-if="instances.length == 0">No instances for this world</v-list-subheader>
            <v-list-item v-for="instance in instances" :key="instance" :value="instance">
                {{ instance }}
            </v-list-item>
        </v-list>
    </div>
</template>