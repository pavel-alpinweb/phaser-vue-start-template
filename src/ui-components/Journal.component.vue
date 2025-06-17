<script setup lang="ts">
import { usePlayer } from "@/store/player.store";

const playerStore = usePlayer();
const color = playerStore.currentColor;
</script>

<template>
  <v-expansion-panels class="journal" variant="inset" :color="`${color}-darken-4`">
    <v-expansion-panel
      v-for="record in playerStore.journal"
      :key="record.id"
      :title="record.title"
      :text="record.text"
      :bg-color="`${color}-darken-3`"
    ></v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped lang="scss">
  .journal {
    width: 700px;
  }
</style>