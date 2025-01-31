import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import LevelCompleteDialog from "@/components/LevelCompleteDialog.vue";
import { nextTick } from "vue";
import { router } from "@/routing/router";

const props = {
    level: 3,
    isLevelComplete: true,
    advanceToNextLevel: vi.fn(),
};

describe("LevelCompleteDialog.vue", () => {
    it("renders correctly when the level is complete", async () => {
        const wrapper = mount(LevelCompleteDialog, {
            props,
        });

        await nextTick();

        expect(wrapper.text()).toContain(`Level ${props.level} Complete!`);
        expect(wrapper.text()).toMatch(new RegExp(`Congratulations, you completed level ${props.level}.*`));
    });

    it("shows the correct action buttons", async() => {
        const wrapper = mount(LevelCompleteDialog, {
            props,
        });

        await nextTick();

        const buttons = wrapper.findAll("button");

        expect(buttons).toHaveLength(2);
        expect(buttons[0].text()).toBe("End Game");
        expect(buttons[1].text()).toBe("Next Level");
    });

    it("calls advanceToNextLevel when 'Next Level' is clicked", async () => {
        const wrapper = mount(LevelCompleteDialog, {
            props
        });

        await nextTick();

        const buttons = wrapper.findAll("button");

        await buttons[1].trigger("click");

        expect(props.advanceToNextLevel).toHaveBeenCalled();
    });

    it("expects another dialog to be opened to confirm end game", async () => {
        const wrapper = mount(LevelCompleteDialog, {
            props
        });

        await nextTick();

        const buttons = wrapper.findAll("button");

        await buttons[0].trigger("click");

        expect(wrapper.text()).toContain("End Game");
    });

    it("expects to navigate to / when 'End Game' is clicked", async () => {
        const wrapper = mount(LevelCompleteDialog, {
            props,
            global: {
                plugins: [router]
            }
        });

        await nextTick();
        await router.isReady();

        const buttons = wrapper.findAll("button");

        await buttons[0].trigger("click");

        const endGameButton = wrapper.find("button");

        await endGameButton.trigger("click");

        expect(router.currentRoute.value.path).toBe("/");
    });
});
