import { extractPropertyValue } from "@/utils/utils.js";

export const platformerComposition = {
  preloadLevel(scene) {
    scene.load.image("platform", "assets/levels/tiles/platform.png");
    scene.load.image("door2", "assets/levels/tiles/door2.png");
    scene.load.tilemapTiledJSON("platformer-tilemap", "assets/levels/tilemaps/platformer.json");
    scene.load.image('mountBack', 'assets/img/background/mount-back.png');
    scene.load.image('mountFront', 'assets/img/background/mount-front.png');
  },
  createLevel(scene) {
    const map = scene.make.tilemap({ key: "platformer-tilemap" });

    const block = map.addTilesetImage("platform", "platform");
    const layer = map.createLayer("Platforms", [block]);
    map.setCollision([1]);

    const objectLayerMeta = map.getObjectLayer("object_layer");
    const objectLayer = scene.physics.add.staticGroup();
    objectLayerMeta.objects.forEach(obj => {
      const imageName = extractPropertyValue(obj, "imageName");
      objectLayer.get(obj.x + obj.width / 2, obj.y - obj.height / 2, imageName)
        .setSize(obj.width, obj.height);
    });

    return [map, layer, objectLayer];
  },
  createParallaxImages(scene) {
    const camera = scene.cameras.main;

    const backgroundFar = scene.add.image(-1755, 1706, 'mountBack')
      .setOrigin(0.5, 0.04)
      .setScrollFactor(0);

    const backgroundNear = scene.add.image(-1755, 1706, 'mountFront')
      .setOrigin(0.9, -2)
      .setScrollFactor(0);

      return [camera, backgroundNear, backgroundFar];
  },
  moveParallaxImages(camera, backgroundNear, backgroundFar, scene) {
    const scrollX = camera.scrollX;
    const scrollY = camera.scrollY;

    backgroundFar.setPosition(-scrollX * 0.3, scene.scale.height - scrollY * 0.3);
    backgroundNear.setPosition(-scrollX * 0.6, scene.scale.height - scrollY * 0.6);
  },
};
