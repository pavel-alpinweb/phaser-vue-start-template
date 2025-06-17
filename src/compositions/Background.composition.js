export const backgroundComposition = {
  preloadBackgroundImage(scene) {
    scene.load.image("background_star_sky", "assets/img/background/star_sky.png");
  },

  createBackgroundImage(scene, width, height) {
    return scene.add.tileSprite(0, 0, width, height, "background_star_sky")
      .setOrigin(0, 0)
      .setScrollFactor(0);
  },

  moveBackground(camera, background) {
    background.tilePositionX = camera.scrollX;
    background.tilePositionY = camera.scrollY;
  }
};