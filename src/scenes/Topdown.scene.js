import * as Phaser from "phaser";
import {playerComposition} from "@/compositions/Player.composition.js";
import {sceneComposition} from "@/compositions/scene.composition.js";
import {backgroundComposition} from "@/compositions/Background.composition.js";
import {topdownMapComposition} from "@/compositions/TopdownMap.composition.js";
import {EventBus} from "@/utils/utils.js";
import * as Config from "@/configs/gameplay.config.js";
import * as EventNames from "@/configs/eventNames.config.js";

export class TopdownScene extends Phaser.Scene {
  constructor(playerStore) {
    super("MainScene");
    this.playerStore = playerStore;
  }

  preload() {
    sceneComposition.preload(this);
    playerComposition.preloadPlayerAnimation(this);
    backgroundComposition.preloadBackgroundImage(this);
    topdownMapComposition.preloadLevel(this);
  }

  create() {
    this.background = backgroundComposition.createBackgroundImage(this, this.cameras.main.width, this.cameras.main.height);
    const[map, groundLayer, doorLayer, heartLayer, bombLayer] = topdownMapComposition.createLevel(this);

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

    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.overlap(this.player, doorLayer, () => EventBus.emit(EventNames.GO_TO_PLATFORM));
    this.physics.add.collider(this.player, heartLayer, (player, heart) => {
      playerComposition.handleHeartCollision(player, heart, this.playerStore);
    });
    this.physics.add.collider(this.player, bombLayer, (player, bomb) => {
      playerComposition.handleBombCollision(player, bomb, this.playerStore);
    });
  }

  update() {
    playerComposition.movePlayerOnTopDown(this.player, this.userInput);
    backgroundComposition.moveBackground(this.cameras.main, this.background);
  }
}
