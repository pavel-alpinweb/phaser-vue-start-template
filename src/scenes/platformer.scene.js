import * as Phaser from "phaser";

export class PlatformerScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("player", "assets/img/player.png"); // из public/
  }

  create() {
    this.add.image(400, 300, "player");
  }
}
