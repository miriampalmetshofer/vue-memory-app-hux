import {GameMode} from "@/store/game.ts";

export type GameData = {
  nickname: string;
  gameMode: GameMode;
  level: number;
};