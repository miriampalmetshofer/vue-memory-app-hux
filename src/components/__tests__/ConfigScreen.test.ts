import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Config from "../../components/screens/ConfigScreen.vue"; // Adjust path to your component
import { createPinia, setActivePinia } from "pinia";
import { useRouter } from "vue-router";
import { router } from '../../routing/router';
import { useGameStore } from "../../store/game";


vi.mock('vue-router');

vi.mock('../../store/game', () => ({
  useGameStore: vi.fn().mockReturnValue({
    nickname: '',
    gameMode: 'MAX_FLIPS',
  }),
  GameMode: {
    MAX_FLIPS: 'MAX_FLIPS',
    TIMER: 'TIMER',
  },
}))

describe("Config Component", () => {

  vi.mocked(useRouter).mockReturnValue({
    ...router,
    push: vi.fn()
  })

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(useRouter().push).mockReset()
    
  })


  // simple Test - TODO: DELETE THIS
  it("form exists", async () => {
    const wrapper = mount(Config);
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });


 it('should show an error message when nickname is too short', async () => {
    const wrapper = mount(Config);

    const nicknameInput = wrapper.find('input[placeholder="Nickname"]');
    await nicknameInput.setValue('a');

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger('click');

    const errorMessage = wrapper.find('p[role="alert"]');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('String must contain at least 2 character(s)'); // Check the content of the error message
  });

  it('should update the nickname in the store when the form is submitted', async () => {
    const wrapper = mount(Config);

    // Find the nickname input and set its value
    const nicknameInput = wrapper.find('input[placeholder="Nickname"]');
    await nicknameInput.setValue('JohnDoe'); 

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger('click'); 

    await wrapper.vm.$nextTick();

    const gameStore = useGameStore();
    expect(gameStore.nickname).toBe('JohnDoe'); 

    expect(router.push).toHaveBeenCalledWith('/game');
  });
});
