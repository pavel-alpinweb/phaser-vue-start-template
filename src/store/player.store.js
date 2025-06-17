import { defineStore } from "pinia";
import { PLAYER_CURRENT_HEALTH } from "@/configs/gameplay.config.js";

export const usePlayer = defineStore("player", {
  state: () => ({
    currentHealth: PLAYER_CURRENT_HEALTH,
    currentLevel: "BlueWhale",
    abilities: [
      {
        name: "jump",
        isActive: false,
        icon: "move_up",
      },
      {
        name: "fire",
        isActive: false,
        icon: "local_fire_department",
      },
      {
        name: "gravity",
        isActive: false,
        icon: "arrow_upward",
      },
      {
        name: "freeze",
        isActive: false,
        icon: "pause_circle",
      },
    ],
    journal: [
      {
        title: 'Blue Whale story',
        text: 'Blue Whale story text...',
        id: 0,
      },
      {
        title: 'Blue Whale story',
        text: 'Blue Whale story text...',
        id: 1,
      },
      {
        title: 'Blue Whale story',
        text: 'Blue Whale story text...',
        id: 2,
      },
    ],
    alert: {
      isShow: true,
      isShowAction: true,
      text: 'New record was added in journal'
    },
    currentColor: 'green',
  }),
  getters: {
    currentAbility(state) {
      return state.abilities.find((ability) => ability.isActive);
    },
  },
  actions: {
    increase(value, maxHealth) {
      this.currentHealth = Math.min(maxHealth, this.currentHealth + value);
    },
    decrease(value) {
      this.currentHealth = Math.max(0, this.currentHealth - value);
    },
    closeMessage() {
      this.alert.isShow = false;
      this.alert.isShowAction = false;
    },
    showMessage(message, isShowAction = false) {
      this.alert.isShow = true;
      this.alert.isShowAction = isShowAction;
      this.alert.text = message;
    },
  },
});