import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Config from "../../components/screens/ConfigScreen.vue"; // Adjust path to your component
import { createPinia, setActivePinia } from "pinia";
import { useRouter } from "vue-router";
import { router } from '../../routing/router';
import waitForExpect from 'wait-for-expect';

vi.mock('vue-router');

vi.mock('../../store/game', () => ({
  useGameStore: vi.fn(),
  GameMode: {
    TIMER: 'timer',
    MAX_FLIPS: 'maxFlips',
  },
}));

describe("Config Component", () => {
  const mockPush = vi.fn();
  vi.mocked(useRouter).mockReturnValue({
    ...router,
    push: mockPush,
  });

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    mockPush.mockReset();
  });

  it('should show an error message when nickname is too short', async () => {
    const wrapper = mount(Config);

    const nicknameInput = wrapper.find('input[placeholder="Nickname"]');
    await nicknameInput.setValue('a');

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger('click');

    await waitForExpect(() => {
      const errorMessage = wrapper.find('p[role="alert"]');
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toContain('String must contain at least 2 character(s)');
    });
  });

  it('should show an error message when game mode is not selected', async () => {
    const wrapper = mount(Config);

    const nicknameInput = wrapper.find('input[placeholder="Nickname"]');
    await nicknameInput.setValue('JaneDoe');

    const select = wrapper.find('select');
    await select.setValue('');

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger('click');

    await waitForExpect(() => {
      const errorMessage = wrapper.find('p[role="alert"]');
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toContain('Game mode is required');
    });
  });
});
