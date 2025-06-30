<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToGame = (event) => {
  event.preventDefault();
  router.push("/topdown");
};
</script>

<template>
  <div class="start-menu-screen">
    <h1  class="start-menu-screen__title">Starter Template: Phaser + Vue + Pinia + Vite</h1>
    <form class="start-menu-screen__form" @submit="goToGame">
      <button class="start-menu-screen__btn">Play</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.start-menu-screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #a09380 url("/public/assets/img/background/sky.png") center center;
  background-size: cover;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 500px;
  }
  
  &__title {
    color: #2c1f1a;
  }

  &__input {
    width: 100%;
    height: 50px;
    border: 5px solid #9fcc3b;
    background-color: #ddedae;
    color: #111516;
    font-size: 50px;
    font-weight: bold;
    outline: none;
    padding: 10px;
    font-family: inherit;
  }

  &__btn {
    width: 60%;
    height: 100px;
    cursor: pointer;
    border: none;
    background: #7f4837;
    background-size: 100%;
    color: #d99b47;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 50px;
    font-family: inherit;
    &:hover {
      background: #b56f44;
      background-size: 100%;
    }
  }
}
</style>
