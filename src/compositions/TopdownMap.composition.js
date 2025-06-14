import {extractPropertyValue} from "@/utils/utils.js";

export const topdownMapComposition = {
  preloadLevel(scene) {
    scene.load.image("ground_tiles", "assets/levels/tiles/ground_tiles.jpg");
    scene.load.image("door", "assets/levels/tiles/door.png");
    scene.load.tilemapTiledJSON("topdown-tilemap", "assets/levels/tilemaps/topdown.json");
  },

  createLevel(scene) {
    const map = scene.make.tilemap({ key: "topdown-tilemap" });

    const groundTileset = map.addTilesetImage("ground_tiles");
    const groundLayer = map.createLayer("ground_layer", [groundTileset]);
    map.setCollision([3]);

    const interactiveLayerMeta = map.getObjectLayer("interactive_layer");
    const interactiveLayer = scene.physics.add.staticGroup();
    interactiveLayerMeta.objects.forEach(obj => {
      const imageName = extractPropertyValue(obj, "imageName");
      interactiveLayer.get(obj.x + obj.width / 2, obj.y - obj.height / 2, imageName)
        .setSize(obj.width, obj.height);
    });

    return [map, groundLayer, interactiveLayer];
  }
};