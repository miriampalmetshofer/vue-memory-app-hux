import { vi, expect, it, describe, beforeEach, Mock} from 'vitest';
import {useTimer} from '@/composable/useTimer';
import {createPinia, setActivePinia} from "pinia";
import {mount, VueWrapper} from "@vue/test-utils";
import {defineComponent} from "vue";

describe('useTimer', () => {
    let gameOverMock: Mock<() => void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let wrapper: VueWrapper<any>;
    let timerHook: ReturnType<typeof useTimer>;

    const baseTime = 4;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);

        const TestComponent = defineComponent({
            setup() {
                vi.useFakeTimers();
                gameOverMock = vi.fn();
                return { timerHook: useTimer(baseTime, gameOverMock) };
            },
            template: `<div />`,
        });

        wrapper = mount(TestComponent, {
            global: { plugins: [pinia] },
        });

        timerHook = wrapper.vm.timerHook;
    });


    it('should initialize with the correct time remaining', () => {
        expect(timerHook.remainingTime.value).toBe(baseTime);
    });

    it('should decrement time remaining every second', async () => {
        timerHook.startTimer();

        vi.advanceTimersByTime(3000);

        expect(timerHook.remainingTime.value).toBe(baseTime - 3);
    });

    it('should pause the timer correctly', async () => {
        timerHook.startTimer();
        vi.advanceTimersByTime(3000);

        timerHook.pauseTimer();

        const timeAfterPause = timerHook.remainingTime.value;
        vi.advanceTimersByTime(3000);

        expect(timerHook.remainingTime.value).toBe(timeAfterPause);
    });

    it('should reset and restart the timer with new time when setRemainingTime is called', async () => {
        timerHook.startTimer();
        vi.advanceTimersByTime(5000);

        timerHook.setRemainingTime(20);
        expect(timerHook.remainingTime.value).toBe(20);

        vi.advanceTimersByTime(5000);
        expect(timerHook.remainingTime.value).toBe(15);
    });
});
