import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import EndScreen from "../screens/EndScreen.vue";
import { GameMode, useGameStore } from "../../store/game";
import { setActivePinia, createPinia } from "pinia";

vi.mock('vue-router');

describe("End Screen", () => {

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        }
    );

    it('should display timer message when the game ends', () => {
        const gameStore = useGameStore();
        gameStore.gameMode = GameMode.TIMER;
        gameStore.nickname = "WarriorKing";

        const wrapper = mount(EndScreen);

        const header = wrapper.find("h1");

        expect(header.text()).toBe("Oops, WarriorKing! Time's Up!");
  });

    it('should display max flips message when the game ends', () => {
        const gameStore = useGameStore();
        gameStore.gameMode = GameMode.MAX_FLIPS;
        gameStore.nickname = "WarriorKing";

        const wrapper = mount(EndScreen);

        const header = wrapper.find("h1");

        expect(header.text()).toBe("Oops, WarriorKing! You've reached the maximum flips!");
  });
});
