import {ref, onUnmounted, onMounted} from 'vue';

export function useTimer(baseTime: number, gameOver: () => void) {
    const timeRemaining = ref(baseTime);
    let timerInterval: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(() => {
            if (timeRemaining.value === 0) {
                gameOver();
            } else {
                timeRemaining.value -= 1;
            }
        }, 1000);
    };

    const resetTimer = (newTime: number) => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
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
            startTimer();
        }
    };

    onUnmounted(() => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    });

    onMounted(() => {
        startTimer();
    });

    return {
        timeRemaining,
        resetTimer,
        pauseTimer,
        resumeTimer,
    };
}
