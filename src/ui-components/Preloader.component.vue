<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { EventBus } from "@/utils/utils";

const progress = ref(0);
const isShowing = ref(true);

onMounted(() => {
  EventBus.on("preloading-progress", (value) => {
    progress.value = Math.floor(value * 100);
  });

  EventBus.on("complete-progress", (value) => {
    isShowing.value = !value;
  });
});

onBeforeUnmount(() => {
  EventBus.off("preloading-progress");
  EventBus.off("complete-progress");
});
</script>

<template>
  <transition name="fade">
    <div v-if="isShowing" class="preloader">
      <h2 class="preloader__progress">Loading... {{ progress }}%</h2>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #000;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
