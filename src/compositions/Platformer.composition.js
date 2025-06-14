import { extractPropertyValue } from "@/utils/utils.js";

export const platformerComposition = {
  preloadLevel(scene) {
    scene.load.image("platform", "assets/levels/tiles/platform.png");
    scene.load.image("door2", "assets/levels/tiles/door2.png");
    scene.load.tilemapTiledJSON("platformer-tilemap", "assets/levels/tilemaps/platformer.json");
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
};
