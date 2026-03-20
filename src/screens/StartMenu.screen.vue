<script setup lang="ts">
import { useRouter } from "vue-router";
import LanguageSwitcher from "@/ui-components/LanguageSwitcher.vue";
import { createI18nContentHelpers } from "@/utils/utils.js";
import i18next from "@/i18n.js";
import { UI_LOCALIZATION } from "@/configs/uiLocalization.config.js";
import MainLogo from "/public/assets/img/Logo.svg";

const router = useRouter();
const { tContent } = createI18nContentHelpers(i18next);

const goToGame = (event) => {
  event.preventDefault();
  router.push("/topdown");
};
</script>

<template>
  <div class="start-menu-screen">
    <LanguageSwitcher />
    <div class="start-menu-screen__logo-container">
      <MainLogo class="start-menu-screen__logo" />
    </div>
    <h1 class="start-menu-screen__title">
      <span class="start-menu-screen__title-main">{{ tContent(UI_LOCALIZATION.main_title) }}</span>
      <span class="start-menu-screen__title-sub">{{ tContent(UI_LOCALIZATION.main_description) }}</span>
    </h1>
    <form class="start-menu-screen__form" @submit="goToGame">
      <button class="start-menu-screen__btn">
        {{ tContent(UI_LOCALIZATION.start_button) }}
      </button>
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

  &__logo-container {
    width: 250px;
    height: auto;
    margin-bottom: -20px;
    filter: drop-shadow(4px 4px 0px #2c1f1a);
    animation: float 4s ease-in-out infinite;
  }

  &__logo {
    width: 100%;
    height: 100%;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 500px;
  }

  &__title {
    color: #2c1f1a;
    text-align: center;
    display: flex;
    flex-direction: column;
    line-height: 1;
    margin-bottom: 40px;

    &-main {
      font-size: 120px;
      text-transform: uppercase;
      letter-spacing: 4px;
      text-shadow: 4px 4px 0px #7f4837;
      color: #d99b47;
    }

    &-sub {
      font-size: 32px;
      margin-top: 10px;
      font-weight: normal;
      opacity: 0.9;
      letter-spacing: 2px;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 500px;
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
