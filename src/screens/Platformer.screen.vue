<script setup lang="ts">
import { onMounted, ref } from "vue";
import Phaser from "phaser";
import { PlatformerScene } from "@/scenes/platformer.scene";
import Preloader from "@/ui-components/Preloader.component.vue";

const gameContainer = ref(null);

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    scene: new PlatformerScene(),
    backgroundColor: "#000000",
    scale: {
      width: 960,
      height: 540,
      mode: Phaser.Scale.FIT,
      parent: gameContainer.value,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  });
});
</script>

<template>
  <div class="platformer-screen">
    <Preloader />
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
