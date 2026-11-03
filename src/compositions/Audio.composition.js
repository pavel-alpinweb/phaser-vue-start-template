export const audioComposition = {
  listenerPosition: { x: 0, y: 0 },
  initialVolumes: {},

  preloadAudioFiles(scene, audioConfigs) {
    for (const audioConfig of audioConfigs) {
      scene.load.audio(audioConfig.key, audioConfig.filePath);
    }
  },

  createAudioForScene(scene, audioConfigs) {
    for (const audioConfig of audioConfigs) {
      this.initialVolumes[audioConfig.key] = audioConfig.volume ?? 1;
      scene.sound.add(audioConfig.key, audioConfig);
    }

    scene.events.once("shutdown", () => scene.sound.stopAll());
  },

  play(scene, key, audioOptions) {
    if (!key) throw new Error("audioComposition.play(): key is required");

    let sound = scene.sound.get(key);
    if (!sound) throw new Error(`audioComposition.play(): sound with key '${key}' not found. Did you call createAudioForScene()?`);

    if (audioOptions && (!sound.isPlaying || !audioOptions.ignoreIfPlaying)) {
      sound.play(audioOptions);
    } else if (!sound.isPlaying || !sound.config.ignoreIfPlaying) {
      sound.play();
    }
  },

  stop(scene, key) {
    const sound = scene.sound.get(key);
    if (sound && sound.isPlaying) {
      sound.stop();
    }
  },

  updateGlobalVolume(scene, isPlaySound) {
    scene.sound.mute = !isPlaySound;
  },

  setListenerPosition(x, y) {
    this.listenerPosition.x = x;
    this.listenerPosition.y = y;
  },

  getListenerPosition() {
    return this.listenerPosition;
  },

  updateListenerFromObject(target) {
    if (!target) return;
    this.setListenerPosition(target.x ?? 0, target.y ?? 0);
  },

  calculateSpatialParams(sourcePosition, spatialOptions = {}) {
    const { maxDistance = 1000, refDistance = 100, rolloffFactor = 1, baseVolume = 1, panSpread = 500 } = spatialOptions;

    const dx = sourcePosition.x - this.listenerPosition.x;
    const dy = sourcePosition.y - this.listenerPosition.y;
    const distance = Math.hypot(dx, dy);

    let distanceFactor = 0;
    if (distance <= refDistance) {
      distanceFactor = 1;
    } else if (distance < maxDistance) {
      distanceFactor = Math.max(0, 1 - ((distance - refDistance) / (maxDistance - refDistance)) * rolloffFactor);
    }

    const volume = Math.max(0, Math.min(1, baseVolume * distanceFactor));
    const pan = panSpread > 0 ? Math.max(-1, Math.min(1, dx / panSpread)) : 0;

    return { volume, pan, distance };
  },

  updateSpatialSound(scene, key, sourcePosition, spatialOptions = {}) {
    const sound = scene.sound.get(key);
    if (!sound) return;

    const baseVolume = spatialOptions.baseVolume ?? this.initialVolumes[key] ?? 1;
    const { volume, pan } = this.calculateSpatialParams(sourcePosition, {
      ...spatialOptions,
      baseVolume,
    });

    if (typeof sound.setVolume === "function") {
      sound.setVolume(volume);
    }
    if (typeof sound.setPan === "function") {
      sound.setPan(pan);
    }
  },

  playAt(scene, key, sourcePosition, audioOptions = {}) {
    const baseVolume = audioOptions.volume ?? this.initialVolumes[key] ?? 1;

    const { volume, pan } = this.calculateSpatialParams(sourcePosition, {
      ...audioOptions.spatial,
      baseVolume,
    });

    const playOptions = {
      ...audioOptions,
      volume,
      pan,
    };
    delete playOptions.spatial;

    // Для коротких эффектов scene.sound.play() проигрывает звук без мутации настроек базового экземпляра
    scene.sound.play(key, playOptions);
  },
};
