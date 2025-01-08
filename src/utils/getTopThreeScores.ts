export function getTopThreeScores(games: Game[]) {
  if (games) {
    const sortedGames = games.sort((a, b) => b.level - a.level);
    const topThree = sortedGames.slice(0, 3);
    return topThree;
  } else {
    return [];
  }
}
