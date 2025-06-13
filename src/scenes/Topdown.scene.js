import * as Phaser from "phaser";
import {playerComposition} from "@/compositions/Player.composition.js";
import {sceneComposition} from "@/compositions/scene.composition.js";
import {backgroundComposition} from "@/compositions/Background.composition.js";
import {topdownMapComposition} from "@/compositions/TopdownMap.composition.js";
import * as Config from "@/configs/gameplay.config.js";
import { PLAYER_TOPDOWN_BODY_HEIGHT, PLAYER_TOPDOWN_BODY_WIDTH } from "@/configs/gameplay.config.js";

export class TopdownScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    sceneComposition.preload(this);
    playerComposition.preloadPlayerAnimation(this);
    backgroundComposition.preloadBackgroundImage(this);
    topdownMapComposition.preloadLevel(this);
  }

  create() {
    this.background = backgroundComposition.createBackgroundImage(this, this.cameras.main.width, this.cameras.main.height);
    const[map, layer] = topdownMapComposition.createLevel(this);

    this.userInput = playerComposition.createUserInput(this);

    playerComposition.preparePlayerAnimation(this);
    this.player = playerComposition.createPlayer(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      Config.PLAYER_DISPLAY_WIDTH,
      Config.PLAYER_DISPLAY_HEIGHT,
      Config.PLAYER_TOPDOWN_BODY_WIDTH,
      Config.PLAYER_TOPDOWN_BODY_HEIGHT,
      Config.PLAYER_SPEED,
      Config.PLAYER_MAX_HEALTH
    );
    playerComposition.configureCameraFollow(this, this.player, this.cameras.main.width / 4, this.cameras.main.height / 4);

    this.physics.add.collider(this.player, layer);
  }

  update() {
    playerComposition.movePlayerOnTopDown(this.player, this.userInput);
    backgroundComposition.moveBackground(this.cameras.main, this.background);
  }
}
