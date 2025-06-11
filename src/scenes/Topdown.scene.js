import * as Phaser from "phaser";
import {playerComposition} from "@/compositions/Player.composition.js";

export class TopdownScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    playerComposition.preloadPlayerAnimation(this);
  }

  create() {
    this.userInput = playerComposition.createUserInput(this);
    playerComposition.preparePlayerAnimation(this);
    this.player = playerComposition.createPlayer(this, this.cameras.main.width / 2, this.cameras.main.height / 2, 80, 80, 200, 20);
  }

  update() {
    playerComposition.movePlayerOnTopDown(this.player, this.userInput);
  }
}
