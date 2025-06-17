<script setup lang="ts">
import { usePlayer } from "@/store/player.store";
const playerStore = usePlayer();
const color = playerStore.currentColor;

const isActive = (ability) => {
  return ability.name === playerStore.currentAbility?.name;
};
</script>

<template>
  <div class="abilities-set">
    <v-chip
      v-for="(ability, i) in playerStore.abilities"
      :key="ability.name"
      :prepend-icon="ability.icon"
      :variant="isActive(ability) ? 'elevated' : 'outlined'" size="x-large"
      :color="`${color}-darken-4`"
    >
      {{ i + 1 }}
    </v-chip>
  </div>
</template>

<style scoped lang="scss">
.abilities-set {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
</style>
