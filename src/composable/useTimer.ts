import {ref} from 'vue';

export function useTimer(baseTime: number, gameOver: () => void) {
    const remainingTime = ref(baseTime);
    let timerInterval: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(() => {
            if (remainingTime.value < 1) {
                gameOver();
            } else {
                remainingTime.value -= 1;
            }
        }, 1000);
    };

    const setRemainingTime = (newTime: number) => {
        remainingTime.value = newTime;
        startTimer();
    };

    const pauseTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    };

    const resumeTimer = () => {
        if (!timerInterval && remainingTime.value > 0) {
            timerInterval = setInterval(() => {
                if (remainingTime.value < 1) {
                    gameOver();
                } else {
                    remainingTime.value -= 1;
                }
            }, 1000);
        }
    };

    const resetTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        remainingTime.value = baseTime;
    };

    return {
        remainingTime,
        startTimer,
        setRemainingTime,
        pauseTimer,
        resumeTimer,
        resetTimer,
    };
}
