import {ref} from 'vue';

export function useMaxFlips(baseFlips: number, gameOver: () => void) {
    const flipsRemaining = ref<number>(baseFlips);

    const reduceFlipsAndCheckGameOver = () => {
        flipsRemaining.value -= 1;
        if (flipsRemaining.value === 0) {
            gameOver();
        }
    };

    return {
        flipsRemaining,
        reduceFlipsAndCheckGameOver,
    };
}