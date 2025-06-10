import Phaser from "phaser";

export const playerComposition = {
  createPlayer(scene, x, y, width, height, speed, maxHealth) {
    const player = scene.physics.add.sprite(x, y, "player", "0")
      .setBodySize(width, height)
      .setDisplaySize(width, height)
      .setOrigin(0.5, 1)
      .refreshBody();
    player.speed = speed;
    player.depth = 100;
    player.maxHealth = maxHealth;
    player.currentHealth = maxHealth;
    return player;
  },

  movePlayer(player, userInput) {
    player.body.velocity.x = userInput.right.isDown - userInput.left.isDown;
    player.body.velocity.y = userInput.down.isDown - userInput.up.isDown;
    player.body.velocity.normalize().scale(player.speed);

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