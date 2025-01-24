import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { useTimer } from '@/composable/useTimer';

vi.useFakeTimers()

describe("useTimer", () => {
    const baseTime = 10;
    const gameOver = vi.fn();

    beforeEach(() => {
        vi.clearAllTimers();
        vi.clearAllMocks();
    });

    it("should initialize with the correct time", () => {
        const wrapper = mount({
            setup() {
                return useTimer(baseTime, gameOver);
            },
            template: "<div>{{ timeRemaining }}</div>",
        });

        expect(wrapper.text()).toBe(`${baseTime}`);
    });

    it("should countdown every second", async () => {
        const wrapper = mount({
            setup() {
                return useTimer(baseTime, gameOver);
            },
            template: "<div>{{ timeRemaining }}</div>",
        });

        vi.advanceTimersByTime(3000);
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toBe(`${baseTime - 3}`);
    });

    it("should call onTimeUp when time reaches zero", async () => {
        const wrapper = mount({
            setup() {
                return useTimer(baseTime, gameOver);
            },
            template: "<div>{{ timeRemaining }}</div>",
        });

        vi.advanceTimersByTime(baseTime * 1000);
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toBe('0');
    });

    it("should stop the timer when unmounted", async () => {
        const wrapper = mount({
            setup() {
                return useTimer(baseTime, gameOver);
            },
            template: "<div>{{ timeRemaining }}</div>",
        });

        vi.advanceTimersByTime(5000);
        await wrapper.vm.$nextTick();

        wrapper.unmount();

        vi.advanceTimersByTime(5000);
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toBe(`${baseTime - 5}`);
    });
});
