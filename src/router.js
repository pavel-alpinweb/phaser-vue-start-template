import { createRouter, createWebHashHistory } from "vue-router";

import StartMenuScreen from "@/screens/StartMenu.screen.vue";
import GameScreen from "@/screens/Game.screen.vue";

export const routes = [
  {
    path: "/",
    component: StartMenuScreen,
  },
  {
    path: "/game",
    component: GameScreen,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
