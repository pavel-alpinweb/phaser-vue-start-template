export const topdownMapComposition = {
  preloadLevel(scene) {
    scene.load.image("ground_tiles", "assets/levels/tiles/ground_tiles.jpg");
    scene.load.tilemapTiledJSON("topdown-tilemap", "assets/levels/tilemaps/topdown.json");
  },

  createLevel(scene) {
    const map = scene.make.tilemap({ key: "topdown-tilemap" });
    map.setCollision([3]);
    const tileset = map.addTilesetImage("ground_tiles");
    const layer = map.createLayer("ground_layer", [tileset]);

    return [map, layer];
  }
};