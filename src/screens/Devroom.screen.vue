<script setup lang="ts">
import { onMounted, ref } from "vue";
import Phaser from "phaser";
import { DevroomScene } from "@/scenes/devroom.scene";
import Preloader from "@/ui-components/Preloader.component.vue";
import UiAnchor from "@/ui-components/UiAnchor.component.vue";
import { usePlayer } from "@/store/player.store";
import { LEVEL_HEIGHT, LEVEL_WIDTH } from "@/configs/engine.config";
import {router} from "@/router.js";
import UiModal from "@/ui-components/UiModal.component.vue";
import Journal from "@/ui-components/Journal.component.vue";

const gameContainer = ref(null);
const isShowJournal = ref(false);
const playerStore = usePlayer();
const color = playerStore.currentColor;
let game = null;

const goToWhale = () => {
  router.push({ path: "/platformer" });
};

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
    <UiAnchor ref="alertContainer" target=".game-screen__game-wrapper" anchor="top-right">
      <v-alert
        v-if="playerStore.alert.isShow"
        class="game-screen__alert"
        :color="`${color}-darken-3`"
        closable
        @close="playerStore.closeMessage"
      >
        <div class="game-screen__alert-content">
          <span>{{ playerStore.alert.text }}</span>
          <v-btn v-if="playerStore.alert.isShowAction" :color="`${color}-darken-4`" @click="goToWhale">
            Ок
          </v-btn>
        </div>
      </v-alert>
    </UiAnchor>
    <UiModal v-model="isShowJournal" max-width="900px" target=".game-screen__game-wrapper">
      <Journal />
    </UiModal>
    <UiAnchor target=".game-screen__game-wrapper" anchor="bottom-left">
      <v-btn icon="sim_card" size="x-large" :color="`${color}-darken-4`" @click="isShowJournal = true"/>
    </UiAnchor>
    <div ref="gameContainer" class="game-screen__game-wrapper"></div>
  </div>
</template>

<style lang="scss" scoped>
.game-screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  &__alert {
    width: 400px;
  }

  &__alert-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>