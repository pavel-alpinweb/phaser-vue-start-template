<script setup lang="ts">
import { onMounted, ref } from "vue";
import Phaser from "phaser";
import { DevroomScene } from "@/scenes/devroom.scene";
import Preloader from "@/ui-components/Preloader.component.vue";
import HealthBar from "@/ui-components/HealthBar.component.vue";
import UiAnchor from "@/ui-components/UiAnchor.component.vue";
import { usePlayer } from "@/store/player.store";
import { PLAYER_MAX_HEALTH } from "@/configs/gameplay.config";
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "@/configs/engine.config";

const gameContainer = ref(null);
const playerStore = usePlayer();
let game = null;

onMounted(() => {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    scene: new DevroomScene(playerStore),
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