import Phaser from "phaser";
import {PLAYER_JUMP_MULTIPLICATOR, PLAYER_FALL_MULTIPLICATOR} from "@/configs/gameplay.config.js";

export const playerComposition = {
  preloadPlayerAnimation(scene) {
    scene.load.atlas("player_wait", "assets/animation/wait.png", "assets/animation/wait.json");
    scene.load.atlas("player_move", "assets/animation/move.png", "assets/animation/move.json");
    scene.load.atlas("player_jump", "assets/animation/jump.png", "assets/animation/jump.json");
  },

  preparePlayerAnimation(scene) {
    scene.anims.create({
      key: "player_wait",
      frames: scene.anims.generateFrameNames("player_wait", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "player_move",
      frames: scene.anims.generateFrameNames("player_move", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "player_jump",
      frames: scene.anims.generateFrameNames("player_jump", { start: 1, end: 8 }),
      frameRate: 8,
      repeat: 1
    });
  },

  createPlayer(scene, x, y, width, height, speed, maxHealth) {
    const player = scene.physics.add.sprite(x, y, "player_wait", 0)
      .setBodySize(100, 330)
      .setDisplaySize(width, height)
      .setOrigin(0.5, 1)
      .play("player_wait")
      .refreshBody();
    player.speed = speed;
    player.depth = 100;
    player.maxHealth = maxHealth;
    player.currentHealth = maxHealth;
    return player;
  },

  movePlayerOnTopDown(player, userInput) {
    player.body.velocity.x = userInput.right.isDown - userInput.left.isDown;
    player.body.velocity.y = userInput.down.isDown - userInput.up.isDown;
    player.body.velocity.normalize().scale(player.speed);

    if(player.body.velocity.equals(Phaser.Math.Vector2.ZERO))
      player.anims.play("player_wait", true);
    else
      player.anims.play("player_move", true);

    if(player.body.velocity.x !== 0)
      player.setFlipX(userInput.left.isDown);
  },

  movePlayerOnPlatformers(player, userInput) {
    if (userInput.up.isDown && player.body.blocked.down) {
      // jump
      player.anims.play("player_jump", true);
      player.setVelocityY(-player.speed * PLAYER_JUMP_MULTIPLICATOR);
    } else if (userInput.right.isDown && !player.body.blocked.down) {
      // falling right
      player.flipX = false;
      player.anims.play("player_jump", true);
      player.setVelocityX(player.speed * PLAYER_FALL_MULTIPLICATOR);
    } else if (userInput.left.isDown && !player.body.blocked.down) {
      // falling left
      player.flipX = true;
      player.anims.play("player_jump", true);
      player.setVelocityX(-player.speed * PLAYER_FALL_MULTIPLICATOR);
    } else if (!player.body.blocked.down) {
      // falling down
      player.anims.play("player_jump", true);
      player.setVelocityX(0);
    } else if (userInput.right.isDown) {
      // move right
      player.flipX = false;
      player.setVelocityX(player.speed);
      player.anims.play("player_move", true);
    } else if (userInput.left.isDown) {
      // move left
      player.flipX = true;
      player.setVelocityX(-player.speed);
      player.anims.play("player_move", true);
    } else {
      // move stay
      player.setVelocityX(0);
      player.setVelocityX(0);
      player.anims.play("player_wait", true);
    }
  },

  createUserInput(scene) {
    return scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
    });
  }
};