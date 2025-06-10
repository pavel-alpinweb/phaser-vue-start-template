<script setup lang="ts">
import { onMounted, ref } from "vue";
import Phaser from "phaser";
import { TopdownScene } from "@/scenes/Topdown.scene";

const gameContainer = ref(null);

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
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
  });
});
</script>

<template>
  <div class="game-screen">
    <div ref="gameContainer" class="game-screen__game-wrapper"></div>
  </div>
</template>

<style lang="scss" scoped>
.game-screen {
  &__game-wrapper {
    border: 1px solid grey;
  }
}
</style>
