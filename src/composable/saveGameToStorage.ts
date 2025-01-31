import { GAMES_DATA_STORAGE_KEY } from '@/globals/GamesDataStorageKey.ts';
import { useGameStore } from '@/store/game';
import { GameData } from '@/types/GameData';


export function saveGameToStorage() {
    const gameStore = useGameStore();
    
    const storedGames: GameData[] = JSON.parse(
    localStorage.getItem(GAMES_DATA_STORAGE_KEY) || "[]",
    );
    const game: GameData = {
    nickname: gameStore.nickname,
    gameMode: gameStore.gameMode,
    level: gameStore.level - 1,
    };
    storedGames.push(game);
    localStorage.setItem(GAMES_DATA_STORAGE_KEY, JSON.stringify(storedGames));
}