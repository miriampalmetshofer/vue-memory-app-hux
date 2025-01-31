import { GameData } from "../types/GameData";

export function getTopThreeScores(games: GameData[]) {
  if (games) {
    const sortedGames = games.sort((a, b) => b.level - a.level);
    const topThree = sortedGames.slice(0, 3);
    return topThree;
  } else {
    return [];
  }
}
