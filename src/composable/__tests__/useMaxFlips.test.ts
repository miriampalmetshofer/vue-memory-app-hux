import { describe, it, expect, vi } from 'vitest';
import { useMaxFlips } from '@/composable/useMaxFlips';

describe('useMaxFlips', () => {
    it('should initialize flipsRemaining with the given baseFlips', () => {
        const baseFlips = 5;
        const mockGameOver = vi.fn();

        const { flipsRemaining } = useMaxFlips(baseFlips, mockGameOver);

        expect(flipsRemaining.value).toBe(baseFlips);
    });

    it('should decrement flipsRemaining when reduceFlipsAndCheckGameOver is called', () => {
        const baseFlips = 3;
        const mockGameOver = vi.fn();

        const { flipsRemaining, reduceFlipsAndCheckGameOver } = useMaxFlips(baseFlips, mockGameOver);

        reduceFlipsAndCheckGameOver();

        expect(flipsRemaining.value).toBe(baseFlips - 1);
    });

    it('should call gameOver when flipsRemaining reaches zero', () => {
        const baseFlips = 1;
        const mockGameOver = vi.fn();

        const { reduceFlipsAndCheckGameOver } = useMaxFlips(baseFlips, mockGameOver);

        reduceFlipsAndCheckGameOver();

        expect(mockGameOver).toHaveBeenCalled();
    });

    it('should not call gameOver if flipsRemaining is greater than zero', () => {
        const baseFlips = 2;
        const mockGameOver = vi.fn();

        const { reduceFlipsAndCheckGameOver } = useMaxFlips(baseFlips, mockGameOver);

        reduceFlipsAndCheckGameOver();

        expect(mockGameOver).not.toHaveBeenCalled();
    });
});
