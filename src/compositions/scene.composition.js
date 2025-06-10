export const sceneComposition = {
  preload(scene) {
    scene.load.on("progress", (value) => {
      console.log("onProgress", value);
    });

    scene.load.on("complete", () => {
      console.log("onComplete");
    });
  },
};
