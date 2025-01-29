import {ref} from 'vue';

export function useTimer(baseTime: number, gameOver: () => void) {
    const timeRemaining = ref(baseTime);
    let timerInterval: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(() => {
            if (timeRemaining.value < 1) {
                gameOver();
            } else {
                timeRemaining.value -= 1;
            }
        }, 1000);
    };

    const setRemainingTime = (newTime: number) => {
        timeRemaining.value = newTime;
        startTimer();
    };

    const pauseTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    };

    const resumeTimer = () => {
        if (!timerInterval && timeRemaining.value > 0) {
            timerInterval = setInterval(() => {
                if (timeRemaining.value < 1) {
                    gameOver();
                } else {
                    timeRemaining.value -= 1;
                }
            }, 1000);
        }
    };

    const resetTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        timeRemaining.value = baseTime;
    };

    return {
        timeRemaining,
        startTimer,
        setRemainingTime,
        pauseTimer,
        resumeTimer,
        resetTimer,
    };
}
