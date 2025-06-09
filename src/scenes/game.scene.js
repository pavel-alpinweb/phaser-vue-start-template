import * as Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("player", "assets/img/player.png"); // из public/
  }

  create() {
    this.add.image(400, 300, "player");
    this.add.text(300, 50, "Hello from Phaser!", { fontSize: "32px", fill: "#fff" });
  }
}
