import {tilemapComposition } from "@/compositions/Tilemap.composition.js";
import { ISLAND_SPEED_IN_RADIAN } from "@/configs/gameplay.config.js";

export const devroomComposition = {
  preloadLevel(scene) {
    scene.load.image("island-grass-big", "assets/levels/tiles/island-grass-big.png");
    scene.load.image("island-ground-big", "assets/levels/tiles/island-ground-big.png");
    scene.load.tilemapTiledJSON("devroom-tilemap", "assets/levels/tilemaps/devroom.json");
  },

  createLevel(scene) {
    const map = scene.make.tilemap({ key: "devroom-tilemap" });

    this.worldCenter = map.getObjectLayer("points_layer").objects.find(obj => obj.type === "WorldCenter");

    this.islandsLayer = tilemapComposition.createObjectLayer(scene, map, "islands_layer");
    this.islandsLayer.children.iterate(island => {
      island.distanceLength = new Phaser.Math.Vector2(island.x - this.worldCenter.x, island.y - this.worldCenter.y).length();
      island.currentAngle = Math.atan2(island.y - this.worldCenter.y, island.x - this.worldCenter.x);
    });

    return [map, this.islandsLayer];
  },

  moveIslands() {
    this.islandsLayer.children.iterate(island => {
      island.currentAngle += ISLAND_SPEED_IN_RADIAN;
      island.x = this.worldCenter.x + Math.cos(island.currentAngle) * island.distanceLength;
      island.y = this.worldCenter.y + Math.sin(island.currentAngle) * island.distanceLength;
    });
  }
};