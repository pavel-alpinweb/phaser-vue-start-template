export const tilemapComposition = {
  createMetaObjectLayer(map, layerName) {
    const objLayerMeta = map.getObjectLayer(layerName);
    return objLayerMeta.objects.map((objMeta) => copyAllProperties(objMeta, {}));
  },

  toMap(layer, key) {
    const map = {};
    layer.forEach((obj) => {
      const mapKey = obj[key];
      const mapValue = map[mapKey];
      if (mapValue == null) map[mapKey] = obj;
      else if (Array.isArray(mapValue)) map[mapKey].push(obj);
      else map[mapKey] = [mapValue, obj];
    });
    return map;
  },

  createObjectLayer(scene, map, layerName) {
    const objLayerMeta = map.getObjectLayer(layerName);
    const objLayer = scene.physics.add.staticGroup();
    objLayerMeta.objects.forEach((objMeta) => {
      const resultObj = objLayer.get(objMeta.x + objMeta.width / 2, objMeta.y - objMeta.height / 2).setSize(objMeta.width, objMeta.height);

      const imageName = extractPropertyValue(objMeta, "imageName");
      if (imageName) resultObj.setTexture(imageName).setDisplaySize(objMeta.width, objMeta.height);

      Object.assign(resultObj, objMeta.properties);
    });
    return objLayer;
  },

  createTileLayer(map, tilesetName, layerId, collisionIndexes) {
    const tileset = map.addTilesetImage(tilesetName);
    const tileLayer = map.createLayer(layerId, [tileset]);
    map.setCollision(collisionIndexes);
    return tileLayer;
  },
};

function extractPropertyValue(tileMeta, propertyName) {
  return tileMeta?.properties.find((property) => property.name === propertyName)?.value;
}

function copyAllProperties(objMeta, target) {
  target.x = objMeta.x;
  target.y = objMeta.y;
  target.width = objMeta.width;
  target.height = objMeta.height;
  target.name = objMeta.name;
  objMeta.properties?.forEach((property) => (target[property.name] = property.value));
  return target;
}