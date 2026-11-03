import { createRouter, createWebHashHistory } from "vue-router";

import StartMenuScreen from "@/screens/StartMenu.screen.vue";
import TopdownScreen from "@/screens/Topdown.screen.vue";

export const routes = [
  {
    path: "/",
    component: StartMenuScreen,
  },
  {
    path: "/topdown",
    component: TopdownScreen,
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
