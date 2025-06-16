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
      },
      {
        name: "fire",
        isActive: false,
      },
      {
        name: "gravity",
        isActive: false,
      },
      {
        name: "freeze",
        isActive: false,
      },
    ],
    journal: [
      {
        title: 'Blue Whale story',
        text: 'Blue Whale story text...',
      },
    ],

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
  },
});