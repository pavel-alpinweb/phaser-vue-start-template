import * as Phaser from "phaser";
import { sceneComposition } from "@/compositions/scene.composition.js";

export class DevroomScene extends Phaser.Scene {
  constructor(playerStore) {
    super("DevroomScene");
    this.playerStore = playerStore;
  }

  preload() {
    sceneComposition.preload(this);
  }

  create() {}

  update() {}
}
