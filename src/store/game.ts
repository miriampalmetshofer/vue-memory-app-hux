import { defineStore } from 'pinia';
import { ref } from 'vue';

// Enums for GameMode and GameActions
export enum GameMode {
  TIMER = 'timer',
  MAX_FLIPS = 'maxFlips',
}

export enum GameActions {
  UPDATE_LEVEL = 'UPDATE_LEVEL',
  UPDATE_NICKNAME = 'UPDATE_NICKNAME',
  UPDATE_GAME_MODE = 'UPDATE_GAME_MODE',
}

export enum DefaultGameModeValues {
  BASE_TIME = 15,
  BASE_MAX_FLIPS = 4,
}

export const useGameStore = defineStore('game', () => {
  const level = ref(0);
  const nickname = ref('');
  const gameMode = ref<GameMode>(GameMode.TIMER);

  const updateLevel = (newLevel: number) => {
    level.value = newLevel;
  };

  const updateNickname = (newNickname: string) => {
    nickname.value = newNickname;
  };

  const updateGameMode = (newGameMode: GameMode) => {
    gameMode.value = newGameMode;
  };

  return {
    level,
    nickname,
    gameMode,
    updateLevel,
    updateNickname,
    updateGameMode,
    GameMode,
    GameActions,
  };
});
