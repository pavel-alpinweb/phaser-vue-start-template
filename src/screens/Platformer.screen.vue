<script setup lang="ts">
import { onMounted, ref } from "vue";
import Phaser from "phaser";
import { PlatformerScene } from "@/scenes/platformer.scene";
import Preloader from "@/ui-components/Preloader.component.vue";
import HealthBar from "@/ui-components/HealthBar.component.vue";
import UiAnchor from "@/ui-components/UiAnchor.component.vue";
import { usePlayer } from "@/store/player.store";
import { LEVEL_WIDTH, LEVEL_HEIGHT, LEVEL_GRAVITY } from "@/configs/engine.config";
import { PLAYER_MAX_HEALTH } from "@/configs/gameplay.config";

const gameContainer = ref(null);
const playerStore = usePlayer();

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    scene: new PlatformerScene(),
    backgroundColor: "#000000",
    scale: {
      width: LEVEL_WIDTH,
      height: LEVEL_HEIGHT,
      mode: Phaser.Scale.FIT,
      parent: gameContainer.value,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: LEVEL_GRAVITY },
        debug: false,
      },
    },
  });
});
</script>

<template>
  <div class="platformer-screen">
    <Preloader />
    <UiAnchor anchor="top-left" :offset-x="30" :offset-y="30" target=".platformer-screen__game-wrapper">
      <HealthBar :max-health="PLAYER_MAX_HEALTH" :current-health="playerStore.currentHealth" />
    </UiAnchor>
    <div ref="gameContainer" class="platformer-screen__game-wrapper"></div>
  </div>
</template>

<style scoped lang="scss">
.platformer-screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
