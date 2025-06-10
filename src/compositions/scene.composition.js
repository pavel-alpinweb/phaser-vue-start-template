import { EventBus } from "@/utils/utils";

export const sceneComposition = {
  preload(scene) {
    scene.load.on("progress", (value) => {
      EventBus.emit("preloading-progress", value);
    });

    scene.load.on("complete", () => {
      EventBus.emit("complete-progress", true);
    });
  },
};
