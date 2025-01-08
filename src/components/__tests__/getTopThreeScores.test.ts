import { describe, it, expect } from 'vitest';
import { getTopThreeScores } from '../../utils/getTopThreeScores';

describe('getTopThreeScores', () => {
  it('returns the top three scores sorted by level in descending order', () => {
    const games = [
      { nickname: 'John', gameMode: 'Flip Mode', level: 1 },
      { nickname: 'Jane', gameMode: 'Time Mode', level: 2 },
      { nickname: 'Jack', gameMode: 'Time Mode', level: 3 },
    ];

    const result = getTopThreeScores(games);

    expect(result).toEqual([
      { nickname: 'Jack', gameMode: 'Time Mode', level: 3 },
      { nickname: 'Jane', gameMode: 'Time Mode', level: 2 },
      { nickname: 'John', gameMode: 'Flip Mode', level: 1 },
    ]);
  });

  it('returns an empty array if no games are provided', () => {
    const result = getTopThreeScores([]);
    expect(result).toEqual([]);
  });

  it('handles an input with fewer than three games', () => {
    const games = [
      { nickname: 'John', gameMode: 'Flip Mode', level: 1 },
      { nickname: 'Jane', gameMode: 'Time Mode', level: 2 },
    ];

    const result = getTopThreeScores(games);

    expect(result).toEqual([
      { nickname: 'Jane', gameMode: 'Time Mode', level: 2 },
      { nickname: 'John', gameMode: 'Flip Mode', level: 1 },
    ]);
  });

  it('returns an empty array if the input is null or undefined', () => {
    expect(getTopThreeScores(null as any)).toEqual([]);
    expect(getTopThreeScores(undefined as any)).toEqual([]);
  });
});
