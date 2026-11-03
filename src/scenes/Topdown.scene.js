import * as Phaser from "phaser";
import {playerComposition} from "@/compositions/Player.composition.js";
import {sceneComposition} from "@/compositions/scene.composition.js";
import {backgroundComposition} from "@/compositions/Background.composition.js";
import {topdownMapComposition} from "@/compositions/TopdownMap.composition.js";
import * as Config from "@/configs/gameplay.json";
import { audioComposition } from "@/compositions/Audio.composition.js";
import { dynamicLightingComposition } from "@/compositions/DynamicLighting.composition.js";
import {calendarComposition} from "@/compositions/Calendar.composition.js";
import {particlesComposition} from "@/compositions/Particles.composition.js";
import { analyticsComposition } from "@/compositions/Analytics.composition.js";

export class TopdownScene extends Phaser.Scene {
  constructor(playerStore, calendarStore) {
    super("MainScene");
    this.playerStore = playerStore;
    this.calendarStore = calendarStore;
  }

  preload() {
    sceneComposition.preload(this);
    playerComposition.preloadPlayerAnimation(this);
    backgroundComposition.preloadBackgroundImage(this);
    topdownMapComposition.preloadLevel(this);
    audioComposition.preloadAudioFiles(this, Config.audio);
    dynamicLightingComposition.preloadShadersAndTextures(this);
    particlesComposition.preloadParticlesTextures(this, Config.particles);
  }

  create() {
    this.background = backgroundComposition.createBackgroundImage(this, this.cameras.main.width, this.cameras.main.height);
    const [map, groundLayer, doorLayer, heartLayer, bombLayer] = topdownMapComposition.createLevel(this);

    calendarComposition.initCalendar(this.calendarStore, Config.time);

    this.userInput = playerComposition.createUserInput(this);

    playerComposition.preparePlayerAnimation(this);
    this.player = playerComposition.createPlayer(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      Config.player
    );

    particlesComposition.initObjectVFX(this, this.player, ["dust"], Config.particles);

    playerComposition.configureCameraFollow(this, this.player, this.cameras.main.width / 4, this.cameras.main.height / 4);

    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.player, heartLayer, (player, heart) => {
      playerComposition.handleHeartCollision(this, player, heart, this.playerStore);
    });
    this.physics.add.collider(this.player, bombLayer, (player, bomb) => {
      playerComposition.handleBombCollision(this, player, bomb, this.playerStore);
    });

    audioComposition.createAudioForScene(this, Config.audio);
    audioComposition.play(this, "mountains-sounds");
    audioComposition.updateGlobalVolume(this, this.playerStore.isPlaySound);

    this.dayNightLightingPipeline = dynamicLightingComposition.prepareAmbientLightPipeline(
      this,
      Config.time,
      this.calendarStore.currentPhase,
      calendarComposition.getCurrentPhaseProgress(this.calendarStore)
    );

    analyticsComposition.createAnalytics(Config.firebase).then(() => analyticsComposition.log("NewGame", {}));
  }

  update(time, delta) {
    calendarComposition.updateCurrentTime(this.calendarStore, delta);
    audioComposition.updateGlobalVolume(this, this.playerStore.isPlaySound);
    playerComposition.movePlayerOnTopDown(this.player, this.userInput, this);
    backgroundComposition.moveBackground(this.cameras.main, this.background);
    dynamicLightingComposition.updateLighting(this, this.dayNightLightingPipeline, this.calendarStore.currentPhase, calendarComposition.getCurrentPhaseProgress(this.calendarStore), [this.player]);
  }
}
