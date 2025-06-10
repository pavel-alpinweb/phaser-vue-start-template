import * as Phaser from "phaser";
import {playerComposition} from "@/compositions/Player.composition.js";

export class TopdownScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("player", "assets/img/player.png"); // из public/
  }

  create() {
    this.userInput = playerComposition.createUserInput(this);
    this.player = playerComposition.createPlayer(this, this.cameras.main.width / 2, this.cameras.main.height / 2, 80, 80, 200, 20);
  }

  update() {
    playerComposition.movePlayer(this.player, this.userInput);
  }
}
