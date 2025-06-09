<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Phaser from 'phaser'
import GameScene from '@/scenes/game.scene';

const gameContainer = ref(null)

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: gameContainer.value,
    scene: new GameScene(),
    backgroundColor: '#000000',
  })
})
</script>

<template>
  <div class="game-screen">
    <div ref="gameContainer" class="game-screen__game-wrapper"></div>
  </div>
</template>

<style scoped>

</style>