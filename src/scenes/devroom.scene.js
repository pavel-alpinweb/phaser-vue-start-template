import * as Phaser from "phaser";
import { sceneComposition } from "@/compositions/scene.composition.js";
import { backgroundComposition } from "@/compositions/Background.composition.js";
import { devroomComposition } from "@/compositions/devroom.composition.js";

export class DevroomScene extends Phaser.Scene {
  constructor(playerStore) {
    super("DevroomScene");
    this.playerStore = playerStore;
  }

  preload() {
    sceneComposition.preload(this);
    backgroundComposition.preloadBackgroundImage(this);
    devroomComposition.preloadLevel(this);
  }

  create() {
    this.background = backgroundComposition.createBackgroundImage(this, this.cameras.main.width, this.cameras.main.height);
    const [map, islandsLayer] = devroomComposition.createLevel(this);

  }

  update() {
    backgroundComposition.moveBackground(this.cameras.main, this.background);
  }
}
