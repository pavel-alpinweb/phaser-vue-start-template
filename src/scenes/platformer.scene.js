import * as Phaser from "phaser";
import { sceneComposition } from "@/compositions/scene.composition.js";
import {playerComposition} from "@/compositions/Player.composition.js";
import {PLAYER_SPEED} from "@/configs/gameplay.config.js";

export class PlatformerScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    sceneComposition.preload(this);

    this.load.image("platform", "assets/img/objects/platform.png");
    playerComposition.preloadPlayerAnimation(this);
  }

  create() {
    this.platform = this.physics.add.staticSprite(450, 540, "platform");

    this.userInput = playerComposition.createUserInput(this);
    playerComposition.preparePlayerAnimation(this);
    this.player = playerComposition.createPlayer(this, this.cameras.main.width / 2, this.cameras.main.height / 2, 100, 100, PLAYER_SPEED, 20);

    this.physics.add.collider(this.player, this.platform);
  }

  update(time, delta) {
    playerComposition.movePlayerOnPlatformers(this.player, this.userInput);
  }
}
