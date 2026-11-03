import { dayPhases } from "@/compositions/Calendar.composition.js";

export const dynamicLightingComposition = {
  isStopped: false,

  preloadShadersAndTextures(scene) {
    scene.load.glsl("night", "shaders/day-night-lighting.glsl");
    scene.load.image("point_light_texture", "assets/img/lighting/point_light_texture.png");
  },

  prepareAmbientLightPipeline(scene, timeConfig, currentDayPhase, currentDayPhaseProgress) {
    dynamicLightingComposition.isStopped = false;

    if (!scene.renderer.pipelines.getPostPipeline("night")) {
      class NightPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
        constructor(game) {
          super({
            game: game,
            renderTarget: true,
            fragShader: game.cache.shader.get("night").fragmentSrc,
          });

          this.dayPhase = 1;
          this.intensity = 0;
          this.lightMap = null;
        }

        onPreRender() {
          if (dynamicLightingComposition.isStopped) return;

          this.set1i("uDayPhase", this.dayPhase);
          this.set1f("uIntensity", this.intensity);
        }

        onDraw(renderTarget, swapTarget) {
          if (dynamicLightingComposition.isStopped) {
            this.bindAndDraw(renderTarget);
            return;
          }

          const glTexture = this.lightMap?.source?.[0]?.glTexture;
          if (glTexture) {
            this.set1i("uLightPointTexture", 1);
            this.bindTexture(glTexture, 1);
          }

          this.bindAndDraw(renderTarget);
        }
      }

      scene.renderer.pipelines.addPostPipeline("night", NightPipeline);
    }

    const camera = scene.cameras.main;
    camera.setPostPipeline("night");

    const pipelines = camera.getPostPipeline("night");
    const nightPipeline = Array.isArray(pipelines) ? pipelines[0] : pipelines;

    nightPipeline.morningPhaseTransitionFraction = timeConfig.morningPhaseTransitionFraction;
    nightPipeline.afternoonPhaseTransitionFraction = timeConfig.afternoonPhaseTransitionFraction;
    nightPipeline.eveningPhaseTransitionFraction = timeConfig.eveningPhaseTransitionFraction;
    nightPipeline.nightPhaseTransitionFraction = timeConfig.nightPhaseTransitionFraction;

    if (!nightPipeline.lightMap) {
      if (scene.textures.exists("lightMap")) {
        nightPipeline.lightMap = scene.textures.get("lightMap");
        nightPipeline.lightMap.setSize(camera.width, camera.height);
      } else {
        nightPipeline.lightMap = scene.textures.addDynamicTexture("lightMap", camera.width, camera.height);
      }
      nightPipeline.lightMap.setIsSpriteTexture(false);
    }

    updateAmbientLightPipeline(nightPipeline, currentDayPhase, currentDayPhaseProgress);

    return nightPipeline;
  },

  updateLighting(scene, nightPipeline, currentPhase, currentPhaseProgress, objectsWithPointLight = []) {
    updateAmbientLightPipeline(nightPipeline, currentPhase, currentPhaseProgress);
    updatePointLights(scene, nightPipeline, objectsWithPointLight);
  },

  createLightPoint(alpha, tint, radius, offsetX = 0, offsetY = 0) {
    return { alpha, tint, radius, offsetX, offsetY };
  },

  pause() {
    dynamicLightingComposition.isStopped = true;
  },

  resume() {
    dynamicLightingComposition.isStopped = false;
  },
};

function updatePointLights(scene, nightPipeline, objectsWithPointLight = []) {
  if (nightPipeline.lightMap) {
    const lightMap = nightPipeline.lightMap;
    const camera = scene?.cameras?.main;

    const lightFrame = scene.textures.getFrame("point_light_texture");
    if (!lightFrame) return;

    const baseWidth = lightFrame.width;
    const baseHeight = lightFrame.height;
    const zoom = camera ? camera.zoom : 1;

    lightMap.clear();
    lightMap.beginDraw();
    for (const obj of objectsWithPointLight) {
      if (!obj || !obj.light || obj.visible === false || obj.active === false) continue;

      const screenX = camera ? (obj.x - camera.scrollX) * camera.zoom : obj.x;
      const screenY = camera ? (obj.y - camera.scrollY) * camera.zoom : obj.y;

      const diameterInPixels = obj.light.radius * 2 * zoom;
      const scaleX = diameterInPixels / baseWidth;
      const scaleY = diameterInPixels / baseHeight;

      lightMap.stamp("point_light_texture", null, screenX + obj.light.offsetX, screenY + obj.light.offsetY, {
        originX: 0.5,
        originY: 0.5,
        scaleX: scaleX,
        scaleY: scaleY,
        alpha: obj.light.alpha ?? 1,
        tint: obj.light.tint ?? 0xffffff,
        skipBatch: false,
      });
    }
    lightMap.endDraw();
  }
}

function updateAmbientLightPipeline(nightPipeline, currentPhase, currentPhaseProgress) {
  let transitionFraction = 0;
  switch (currentPhase) {
    case dayPhases.morning:
      nightPipeline.dayPhase = 1;
      transitionFraction = nightPipeline.morningPhaseTransitionFraction;
      break;
    case dayPhases.afternoon:
      nightPipeline.dayPhase = 2;
      transitionFraction = nightPipeline.afternoonPhaseTransitionFraction;
      break;
    case dayPhases.evening:
      nightPipeline.dayPhase = 3;
      transitionFraction = nightPipeline.eveningPhaseTransitionFraction;
      break;
    case dayPhases.night:
      nightPipeline.dayPhase = 4;
      transitionFraction = nightPipeline.nightPhaseTransitionFraction;
      break;
  }

  nightPipeline.intensity = Phaser.Math.Clamp((currentPhaseProgress - (1 - transitionFraction)) / transitionFraction, 0, 1);
}