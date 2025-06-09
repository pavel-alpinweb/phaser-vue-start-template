import * as Phaser from "phaser"

export class GameScene extends Phaser.Scene {
  constructor() {
    super("MainScene")
  }

  preload() {
    this.load.image("player", "assets/img/player.png") // из public/
  }

  create() {
    this.add.text(100, 100, "Hello from Phaser!", { fontSize: "32px", fill: "#fff" })
    this.add.image(400, 300, "player")
  }
}
