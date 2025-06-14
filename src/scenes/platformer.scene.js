import * as Phaser from "phaser";
import { sceneComposition } from "@/compositions/scene.composition.js";
import {playerComposition} from "@/compositions/Player.composition.js";
import {platformerComposition} from "@/compositions/Platformer.composition.js";
import * as Config from "@/configs/gameplay.config.js";

export class PlatformerScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    sceneComposition.preload(this);

    platformerComposition.preloadLevel(this);
    playerComposition.preloadPlayerAnimation(this);
  }

  create() {
    const [map, layer] = platformerComposition.createLevel(this);

    this.userInput = playerComposition.createUserInput(this);
    playerComposition.preparePlayerAnimation(this);
    this.player = playerComposition.createPlayer(
      this,
      -1755,
      1706,
      Config.PLAYER_DISPLAY_WIDTH,
      Config.PLAYER_DISPLAY_HEIGHT,
      Config.PLAYER_PLATFORM_BODY_WIDTH,
      Config.PLAYER_PLATFORM_BODY_HEIGHT,
      Config.PLAYER_SPEED,
      Config.PLAYER_MAX_HEALTH
    );

    playerComposition.configureCameraFollow(this, this.player, this.cameras.main.width / 4, this.cameras.main.height / 4);
    this.physics.add.collider(this.player, layer);
  }

  update(time, delta) {
    playerComposition.movePlayerOnPlatformers(this.player, this.userInput);
  }
}
