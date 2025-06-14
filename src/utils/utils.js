import Phaser from "phaser";

export const EventBus = new Phaser.Events.EventEmitter();

export function extractPropertyValue(tileMeta, propertyName) {
  return tileMeta?.properties.find(property => property.name === propertyName)?.value;
}
