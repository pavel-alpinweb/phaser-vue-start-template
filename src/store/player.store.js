import { defineStore } from "pinia";
import * as Config from "@/configs/gameplay.json";

export const usePlayer = defineStore("player", {
  state: () => ({
    currentHealth: Config.player.maxHealth,
    isPlaySound: true,
  }),
  actions: {
    increase(value, maxHealth) {
      this.currentHealth = Math.min(maxHealth, this.currentHealth + value);
    },
    decrease(value) {
      this.currentHealth = Math.max(0, this.currentHealth - value);
    },
  },
});