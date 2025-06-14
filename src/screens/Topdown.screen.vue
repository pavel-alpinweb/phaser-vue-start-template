<script setup lang="ts">
import { onMounted, ref } from "vue";
import Phaser from "phaser";
import { TopdownScene } from "@/scenes/Topdown.scene";
import Preloader from "@/ui-components/Preloader.component.vue";
import HealthBar from "@/ui-components/HealthBar.component.vue";
import UiAnchor from "@/ui-components/UiAnchor.component.vue";
import { usePlayer } from "@/store/player.store";
import { PLAYER_MAX_HEALTH } from "@/configs/gameplay.config";

const gameContainer = ref(null);
const playerStore = usePlayer();

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    scene: new TopdownScene(),
    backgroundColor: "#000000",
    scale: {
      width: 960,
      height: 540,
      mode: Phaser.Scale.FIT,
      parent: gameContainer.value,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
  });
});
</script>

<template>
  <div class="game-screen">
    <Preloader />
    <UiAnchor anchor="top-left" :offset-x="30" :offset-y="30" target=".game-screen__game-wrapper">
      <HealthBar :max-health="PLAYER_MAX_HEALTH" :current-health="playerStore.currentHealth" />
    </UiAnchor>
    <div ref="gameContainer" class="game-screen__game-wrapper"></div>
  </div>
</template>

<style lang="scss" scoped>
.game-screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
