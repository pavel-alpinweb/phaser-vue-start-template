export const platformerComposition = {
  loadLevel(scene) {
    scene.load.image("platform", "assets/levels/tiles/platform.png");
    scene.load.tilemapTiledJSON("platformer-tilemap", "assets/levels/tilemaps/platformer.json");
  },
  createLevel(scene) {
    const map = scene.make.tilemap({ key: "platformer-tilemap" });
    map.setCollision([1]);
    const block = map.addTilesetImage("platform", "platform");
    const layer = map.createLayer("Platforms", [block]);

    return [map, layer];
  },
};
