import * as Phaser from "phaser";
import { sceneComposition } from "@/compositions/scene.composition.js";
import { backgroundComposition } from "@/compositions/Background.composition.js";
import { devroomComposition } from "@/compositions/devroom.composition.js";
import { shipComposition } from "@/compositions/ship.composition.js";
import * as Config from "@/configs/gameplay.config.js";
import { SHIP_ROTATION_SPEED } from "@/configs/gameplay.config.js";

export class DevroomScene extends Phaser.Scene {
  constructor(playerStore) {
    super("DevroomScene");
    this.playerStore = playerStore;
  }

  preload() {
    sceneComposition.preload(this);
    shipComposition.preloadShipAnimation(this);
    backgroundComposition.preloadBackgroundImage(this);
    devroomComposition.preloadLevel(this);
  }

  create() {
    this.background = backgroundComposition.createBackgroundImage(this, this.cameras.main.width, this.cameras.main.height);
    const [map, islandsLayer] = devroomComposition.createLevel(this);

    this.ship = shipComposition.createShip(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      Config.SHIP_DISPLAY_WIDTH,
      Config.SHIP_DISPLAY_HEIGHT,
      Config.SHIP_TOPDOWN_BODY_WIDTH,
      Config.SHIP_TOPDOWN_BODY_HEIGHT,
      Config.SHIP_SPEED,
      Config.SHIP_ROTATION_SPEED
    );
    shipComposition.configureCameraFollow(this, this.ship);
  }

  update() {
    backgroundComposition.moveBackground(this.cameras.main, this.background);
    shipComposition.updateShipAim(this, this.ship);
    shipComposition.movePlayerOnTopDownWithMouse(this.ship);
  }
}
