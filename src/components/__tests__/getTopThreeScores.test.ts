import {describe, expect, it} from 'vitest';
import {getTopThreeScores} from '@/utils/getTopThreeScores.ts';
import {GameMode} from "@/store/game.ts";
import {GameData} from "@/types/GameData.ts";

describe('getTopThreeScores', () => {
  it('returns the top three scores sorted by level in descending order', () => {
    const games: GameData[] = [
      { nickname: 'John', gameMode: GameMode.MAX_FLIPS, level: 1 },
      { nickname: 'Jane', gameMode: GameMode.TIMER, level: 2 },
      { nickname: 'Jack', gameMode: GameMode.TIMER, level: 3 },
    ];

    const result = getTopThreeScores(games);

    expect(result).toEqual([
      { nickname: 'Jack', gameMode: 'timer', level: 3 },
      { nickname: 'Jane', gameMode: 'timer', level: 2 },
      { nickname: 'John', gameMode: 'maxFlips', level: 1 },
    ]);
  });

  it('returns an empty array if no games are provided', () => {
    const result = getTopThreeScores([]);
    expect(result).toEqual([]);
  });

  it('handles an input with fewer than three games', () => {
    const games: GameData[] = [
        { nickname: 'John', gameMode: GameMode.MAX_FLIPS, level: 1 },
        { nickname: 'Jane', gameMode: GameMode.TIMER, level: 2
    }];

    const result = getTopThreeScores(games);

    expect(result).toEqual([
      { nickname: 'Jane', gameMode: 'timer', level: 2 },
      { nickname: 'John', gameMode: 'maxFlips', level: 1 },
    ]);
  });

  it('returns an empty array if the input is null or undefined', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getTopThreeScores(null as any)).toEqual([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getTopThreeScores(undefined as any)).toEqual([]);
  });
});
