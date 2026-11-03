import Phaser from "phaser";
import { audioComposition } from "@/compositions/Audio.composition.js";
import * as Config from "@/configs/gameplay.config.js";

import { particlesComposition } from "@/compositions/Particles.composition.js";
import { analyticsComposition } from "@/compositions/Analytics.composition.js";

export const playerComposition = {
  preloadPlayerAnimation(scene) {
    scene.load.atlas("player_wait", "assets/animation/16x/idle.png", "assets/animation/16x/idle.json");
    scene.load.atlas("player_move", "assets/animation/16x/run.png", "assets/animation/16x/run.json");
    scene.load.atlas("player_fall", "assets/animation/16x/fall.png", "assets/animation/16x/fall.json");
    scene.load.atlas("player_jump", "assets/animation/16x/jump.png", "assets/animation/16x/jump.json");
  },

  preparePlayerAnimation(scene) {
    scene.anims.create({
      key: "player_wait",
      frames: scene.anims.generateFrameNames("player_wait"),
      frameRate: 24,
      repeat: -1,
    });
    scene.anims.create({
      key: "player_move",
      frames: scene.anims.generateFrameNames("player_move"),
      frameRate: 24,
      repeat: -1,
    });
    scene.anims.create({
      key: "player_fall",
      frames: scene.anims.generateFrameNames("player_fall"),
      frameRate: 40,
      repeat: -1,
    });
    scene.anims.create({
      key: "player_jump",
      frames: scene.anims.generateFrameNames("player_jump"),
      frameRate: 40,
      repeat: 0,
    });
  },

  createPlayer(scene, x, y, displayWidth, displayHeight, bodyWidth, bodyHeight, speed, maxHealth) {
    const player = scene.physics.add.sprite(x, y, "player_wait").setDisplaySize(displayWidth, displayHeight).setBodySize(bodyWidth, bodyHeight).setOrigin(0.5, 1).play("player_wait").refreshBody();
    player.speed = speed;
    player.aimX = x;
    player.aimY = y;
    player.currentDirectional = new Phaser.Math.Vector2();
    player.rotationSpeed = 0.15;
    player.depth = 100;
    player.maxHealth = maxHealth;
    player.currentHealth = maxHealth;
    return player;
  },

  configureCameraFollow(scene, player, deadzoneWidth, deadzoneHeight) {
    scene.cameras.main.startFollow(player);
    scene.cameras.main.setDeadzone(deadzoneWidth, deadzoneHeight);
  },

  movePlayerOnTopDown(player, userInput, scene) {
    calculatePlayerVelocityByKeyboard(player, userInput);
    calculatePlayerVelocityByMouse(scene, player);

    const isMoving = !player.body.velocity.equals(Phaser.Math.Vector2.ZERO);

    handlePlayerTopDownState(player, scene, isMoving);
    particlesComposition.setObjectVFXEmitting(player, isMoving, "dust");

    if (player.body.velocity.x !== 0) player.setFlipX(player.body.velocity.x < 0);
  },

  createUserInput(scene) {
    return scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
    });
  },

  handleHeartCollision(scene, player, heart, playerStore) {
    playerStore.increase(Config.HEAL_VALUE, player.maxHealth);
    heart.setActive(false).setVisible(false);
    heart.body.enable = false;
    audioComposition.play(scene, "glitter");
    analyticsComposition.log("take_heart", { currentHealth: player.currentHealth });
  },

  handleBombCollision(scene, player, bomb, playerStore) {
    playerStore.decrease(Config.BOMB_DAMAGE);
    bomb.setActive(false).setVisible(false);
    bomb.body.enable = false;
    audioComposition.play(scene, "explosion");
    analyticsComposition.log("take_bomb", { currentHealth: player.currentHealth });
  },


  //Перемещение для Playable
  updatePlayerAim(scene, player, pointer = scene.input.activePointer) {
    player.aimX = pointer.worldX;
    player.aimY = pointer.worldY;
  },

  updatePlayerAimFromPointer(scene, player, groundLayer, pointer = scene.input.activePointer) {
    const targetTile = groundLayer.getTileAtWorldXY(pointer.worldX, pointer.worldY);

    if (targetTile && (targetTile.index === 1 || targetTile.index === 2)) {
      this.updatePlayerAim(scene, player, pointer);
    }
  },

  movePlayerOnTopDownWithMouse(player, scene, delta = 1000 / 60) {
    const directionToAim = new Phaser.Math.Vector2(player.aimX - player.x, player.aimY - player.y);
    const distanceToAim = directionToAim.length();
    const horizontalDistanceToAim = directionToAim.x;
    const deltaInSeconds = Math.max(delta, 1) / 1000;

    if (distanceToAim <= 1) {
      player.body.setVelocity(0);
      player.currentDirectional.set(0);
      handlePlayerTopDownState(player, scene, false);
      particlesComposition.setObjectVFXEmitting(player, false, "dust");
      return;
    }

    const targetDirectional = directionToAim.normalize();
    const slowingDistance = player.speed * 0.2;

    if (player.currentDirectional.lengthSq() === 0 || distanceToAim <= slowingDistance) {
      player.currentDirectional.copy(targetDirectional);
    } else {
      player.currentDirectional.x += player.rotationSpeed * (targetDirectional.x - player.currentDirectional.x);
      player.currentDirectional.y += player.rotationSpeed * (targetDirectional.y - player.currentDirectional.y);
      player.currentDirectional.normalize();
    }

    const velocity = Math.min(player.speed, distanceToAim / deltaInSeconds);
    player.body.setVelocity(
      player.currentDirectional.x * velocity,
      player.currentDirectional.y * velocity
    );
    handlePlayerTopDownState(player, scene, true);
    particlesComposition.setObjectVFXEmitting(player, true, "dust");

    const horizontalFlipDeadzone = 8;
    if (Math.abs(horizontalDistanceToAim) > horizontalFlipDeadzone) {
      player.setFlipX(horizontalDistanceToAim < 0);
    }
  },
};

function calculatePlayerVelocityByMouse(scene, player) {
  const pointer = scene.input.activePointer;
  if (!pointer.isDown || pointer.event?.target !== scene.game.canvas) return;

  const aimX = pointer.x + scene.cameras.main.scrollX;
  const aimY = pointer.y + scene.cameras.main.scrollY;
  const distanceX = aimX - player.x;
  const distanceY = aimY - player.y;

  player.body.velocity.set(distanceX, distanceY);

  const stopDistance = 5;
  const distance = Math.hypot(distanceX, distanceY);
  if (distance > stopDistance) player.body.velocity.set(distanceX / distance, distanceY / distance).scale(player.speed);
}

function calculatePlayerVelocityByKeyboard(player, userInput) {
  player.body.velocity.x = userInput.right.isDown - userInput.left.isDown;
  player.body.velocity.y = userInput.down.isDown - userInput.up.isDown;
  player.body.velocity.normalize().scale(player.speed);
}

function handlePlayerTopDownState(player, scene, isMoving) {
  if (!isMoving) {
    player.anims.play("player_wait", true);
    audioComposition.stop(scene, "player-move");
    audioComposition.play(scene, "player-wait");
  } else {
    player.anims.play("player_move", true);
    audioComposition.stop(scene, "player-wait");
    audioComposition.play(scene, "player-move");
  }
}
