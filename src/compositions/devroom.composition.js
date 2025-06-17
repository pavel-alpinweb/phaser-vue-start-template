import {tilemapComposition } from "@/compositions/Tilemap.composition.js";

export const devroomComposition = {
  preloadLevel(scene) {
    scene.load.image("island-grass-big", "assets/levels/tiles/island-grass-big.png");
    scene.load.image("island-ground-big", "assets/levels/tiles/island-ground-big.png");
    scene.load.tilemapTiledJSON("devroom-tilemap", "assets/levels/tilemaps/devroom.json");
  },

  createLevel(scene) {
    const map = scene.make.tilemap({ key: "devroom-tilemap" });

    const islandsLayer = tilemapComposition.createObjectLayer(scene, map, "islands_layer");

    return [map, islandsLayer];
  }
};