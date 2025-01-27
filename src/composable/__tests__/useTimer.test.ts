import { vi, expect, it, describe, beforeEach, Mock} from 'vitest';
import {useTimer} from '@/composable/useTimer';
import {createPinia, setActivePinia} from "pinia";

describe('useTimer', () => {
    let gameOverMock: Mock<() => void>;
    let timerHook: ReturnType<typeof useTimer>;
    const baseTime = 4;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        vi.useFakeTimers();
        gameOverMock = vi.fn();
        timerHook = useTimer(baseTime, gameOverMock);
    });

    it('should initialize with the correct time remaining', () => {
        expect(timerHook.timeRemaining.value).toBe(baseTime);
    });

    it('should decrement time remaining every second', async () => {
        timerHook.startTimer();

        vi.advanceTimersByTime(3000);

        expect(timerHook.timeRemaining.value).toBe(baseTime - 3);
    });

    it('should pause the timer correctly', async () => {
        timerHook.startTimer();
        vi.advanceTimersByTime(3000);

        timerHook.pauseTimer();

        const timeAfterPause = timerHook.timeRemaining.value;
        vi.advanceTimersByTime(3000);

        expect(timerHook.timeRemaining.value).toBe(timeAfterPause);
    });

    it('should reset and restart the timer with new time when setRemainingTime is called', async () => {
        timerHook.startTimer();
        vi.advanceTimersByTime(5000);

        timerHook.setRemainingTime(20);
        expect(timerHook.timeRemaining.value).toBe(20);

        vi.advanceTimersByTime(5000);
        expect(timerHook.timeRemaining.value).toBe(15);
    });
});
