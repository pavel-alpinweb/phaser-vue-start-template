import Phaser from "phaser";
import { PLAYER_JUMP_MULTIPLICATOR, PLAYER_FALL_MULTIPLICATOR, HEAL_VALUE, BOMB_DAMAGE } from "@/configs/gameplay.config.js";
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
    updatePlayerVelocity(player, userInput);

    const isMoving = !player.body.velocity.equals(Phaser.Math.Vector2.ZERO);

    handlePlayerTopDownState(player, scene, isMoving);
    particlesComposition.setObjectVFXEmitting(player, isMoving, "dust");

    if (player.body.velocity.x !== 0) player.setFlipX(userInput.left.isDown);
  },

  movePlayerOnPlatformers(player, userInput, scene) {
    handlePlatformerJump(player, userInput);
    handlePlatformerHorizontalMovement(player, userInput);

    const isMovingOnGround = player.body.blocked.down && player.body.velocity.x !== 0;

    handlePlatformerAnimationsAndOffset(player);
    handlePlatformerAudio(player, scene, isMovingOnGround);

    particlesComposition.setObjectVFXEmitting(player, isMovingOnGround, "dust");

    if (player.body.velocity.x !== 0) player.setFlipX(userInput.left.isDown);
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
    playerStore.increase(HEAL_VALUE, player.maxHealth);
    heart.setActive(false).setVisible(false);
    heart.body.enable = false;
    audioComposition.play(scene, "glitter");
    analyticsComposition.log("take_heart", { currentHealth: player.currentHealth });
  },

  handleBombCollision(scene, player, bomb, playerStore) {
    playerStore.decrease(BOMB_DAMAGE);
    bomb.setActive(false).setVisible(false);
    bomb.body.enable = false;
    audioComposition.play(scene, "explosion");
    analyticsComposition.log("take_bomb", { currentHealth: player.currentHealth });
  },
};

function updatePlayerVelocity(player, userInput) {
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

function handlePlatformerJump(player, userInput) {
  if (userInput.up.isDown && player.body.blocked.down) {
    player.body.velocity.y = -player.speed * PLAYER_JUMP_MULTIPLICATOR;
    player.anims.play("player_jump", true);
  }
}

function handlePlatformerHorizontalMovement(player, userInput) {
  player.body.velocity.x = (userInput.right.isDown - userInput.left.isDown) * player.speed;
}

function handlePlatformerAnimationsAndOffset(player) {
  const offsetX = (player.width - Config.PLAYER_PLATFORM_BODY_WIDTH) / 2;

  if (player.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
    player.anims.play("player_wait", true);
    player.setOffset(offsetX, 120);
  } else if (player.body.blocked.down && player.body.velocity.y === 0) {
    player.anims.play("player_move", true);
    player.setOffset(offsetX, 100);
  } else {
    if (player.anims.currentAnim?.key !== "player_jump" || !player.anims.isPlaying) {
      player.anims.play("player_fall", true);
    }
    player.setOffset(offsetX, 120);
    player.body.velocity.x *= PLAYER_FALL_MULTIPLICATOR;
  }
}

function handlePlatformerAudio(player, scene, isMovingOnGround) {
  if (isMovingOnGround) {
    audioComposition.stop(scene, "player-wait");
    audioComposition.stop(scene, "player-fall");
    audioComposition.play(scene, "player-move");
  } else if (player.body.blocked.down) {
    audioComposition.stop(scene, "player-move");
    audioComposition.stop(scene, "player-fall");
    audioComposition.play(scene, "player-wait");
  } else {
    audioComposition.stop(scene, "player-move");
    audioComposition.stop(scene, "player-wait");
    audioComposition.play(scene, "player-fall");
  }
}
