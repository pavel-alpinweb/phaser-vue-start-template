import * as Phaser from "phaser";
import { sceneComposition } from "@/compositions/scene.composition.js";

export class PlatformerScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    sceneComposition.preload(this);

    for (let i = 0; i < 500; i++) {
      this.load.image(`player-${i}`, "assets/img/player.png");
    }
  }

  create() {
    this.add.image(400, 300, "player-1");
  }
}
