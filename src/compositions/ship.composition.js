import Phaser from "phaser";

export const shipComposition = {
  preloadShipAnimation(scene) {
    scene.load.image("ship", "assets/img/ship.png");
  },

  createShip(scene, x, y, displayWidth, displayHeight, bodyWidth, bodyHeight, speed, rotationSpeed) {
    const ship = scene.physics.add.sprite(x, y, "ship")
      .setBodySize(bodyWidth, bodyHeight)
      .setDisplaySize(displayWidth, displayHeight)
      .refreshBody();
    ship.speed = speed;
    ship.depth = 100;
    ship.aimX = x;
    ship.aimY = y;
    ship.rotationSpeed = rotationSpeed;
    ship.currentDirectional = new Phaser.Math.Vector2(1, 0);
    return ship;
  },

  configureCameraFollow(scene, ship) {
    scene.cameras.main.startFollow(ship);
  },

  updateShipAim(scene, ship) {
    if(scene.input.activePointer.leftButtonDown()) {
      ship.aimX = scene.input.activePointer.x + scene.cameras.main.scrollX;
      ship.aimY = scene.input.activePointer.y + scene.cameras.main.scrollY;
    }
  },

  movePlayerOnTopDownWithMouse(ship) {
    if(!Phaser.Geom.Rectangle.Contains(ship.getBounds(), ship.aimX, ship.aimY)) {
      const targetDirectional = new Phaser.Math.Vector2(ship.aimX - ship.x, ship.aimY - ship.y).normalize();
      ship.currentDirectional.x += ship.rotationSpeed * (targetDirectional.x - ship.currentDirectional.x);
      ship.currentDirectional.y += ship.rotationSpeed * (targetDirectional.y - ship.currentDirectional.y);
      ship.currentDirectional.normalize();
      ship.body.velocity.x = ship.currentDirectional.x;
      ship.body.velocity.y = ship.currentDirectional.y;
      ship.body.velocity.scale(ship.speed);
      const directionAngle = Math.atan2(ship.currentDirectional.x, ship.currentDirectional.y);
      ship.body.rotation = Phaser.Math.RadToDeg(-directionAngle) + 90;
    } else {
      ship.body.setVelocity(0);
    }
  },
};