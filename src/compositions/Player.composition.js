import Phaser from "phaser";

export const playerComposition = {
  preloadPlayerAnimation(scene) {
    scene.load.atlas("player_wait", "assets/animation/wait.png", "assets/animation/wait.json");
    scene.load.atlas("player_move", "assets/animation/move.png", "assets/animation/move.json");
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
  },

  createPlayer(scene, x, y, width, height, speed, maxHealth) {
    const player = scene.physics.add.sprite(x, y, "player_wait", 0)
      .setBodySize(width, height)
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

  createUserInput(scene) {
    return scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
    });
  }
};