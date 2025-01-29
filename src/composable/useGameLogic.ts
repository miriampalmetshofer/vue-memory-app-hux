import { ref, watch } from 'vue';
import { useTimer } from '@/composable/useTimer';
import { Card } from "@/types/Card.ts";
import { GameLogic } from "@/types/GameLogic.ts";
import { GameMode, useGameStore } from "@/store/game.ts";
import { useMaxFlips } from "@/composable/useMaxFlips.ts";
import {fetchImages} from "@/utils/APIClient.ts";

export function useGameLogic(baseTime: number, baseFlips: number): GameLogic {
    const level = ref<number>(1);
    const cards = ref<Card[]>([]);
    const flippedCards = ref<Card[]>([]);
    const cachedImages = ref<string[]>([]);

    const { timeRemaining, setRemainingTime, startTimer, pauseTimer, resumeTimer } = useTimer(baseTime, gameOver);
    const { flipsRemaining, reduceFlipsAndCheckGameOver } = useMaxFlips(baseFlips, gameOver);

    const gameStore = useGameStore();

    const generateCards = async (): Promise<void> => {
        const numCards = level.value * 2 + 2;
        const numUniqueImages = numCards / 2;

        const images = await fetchImages(numUniqueImages);
        cachedImages.value = images;

        const newCards: Card[] = Array.from({ length: numCards }, (_, index): Card => ({
            id: index,
            image_id: Math.floor(index / 2),
            image_url: images[Math.floor(index / 2)],
            is_flipped: false,
            is_matched: false,
        }));
        newCards.sort(() => Math.random() - 0.5); // Shuffle cards
        cards.value = newCards;
    };
    watch(level, generateCards, {immediate: true});

    const handleClick = (card: Card): void => {
        // two cards are already flipped -> do nothing
        if (flippedCards.value.length == 2) return;

        // one card is already flipped -> check for match
        if (flippedCards.value.length === 1) {
            flipCard(card);
            flippedCards.value.push(card);

            const matched = checkMatch(card);
            if (matched) {
                handleMatched(card, flippedCards.value[0]);
                checkLevelIncrease();
            } else {
                if (gameStore.gameMode === GameMode.MAX_FLIPS) {
                    reduceFlipsAndCheckGameOver();
                }
                handleMismatch();
            }

        // no cards are flipped -> flip the card
        } else {
            flipCard(card);
            flippedCards.value = [card];
        }
    };

    function gameOver() {
        alert("Game Over!");
        level.value = 1;
        setRemainingTime(baseTime);
        flipsRemaining.value = baseFlips;
    }

    function increaseTimer() {
        setRemainingTime(baseTime + (level.value - 1) * 5);
    }

    const increaseFlips = () => {
        flipsRemaining.value = baseFlips + (level.value - 1) * 5;
    };

    const advanceToNextLevel = () => {
        level.value += 1;
        if (gameStore.gameMode === GameMode.TIMER) {
            increaseTimer();
        } else {
            increaseFlips();
        }
    };

    const checkLevelIncrease = () => {
        const allMatched = cards.value.every((card: Card) => card.is_matched);
        if (allMatched) {
            advanceToNextLevel();
        }
    };

    const checkMatch = (card: Card): boolean =>
        flippedCards.value[0]?.image_id === card.image_id;

    const handleMatched = (card1: Card, card2: Card): void => {
        cards.value = cards.value.map((c: Card) => {
            if (c.id === card1.id || c.id === card2.id) {
                c.is_matched = true;
            }
            return c;
        });
        flippedCards.value = [];
    };

    const handleMismatch = (): void => {
        setTimeout(() => {
            flipAllCards();
            flippedCards.value = [];
        }, 1000);
    };

    const flipCard = (card: Card): void => {
        cards.value = cards.value.map((c: Card) => {
            if (c.id === card.id) {
                c.is_flipped = !c.is_flipped;
            }
            return c;
        });
    };

    const flipAllCards = (): void => {
        cards.value = cards.value.map((c: Card) => {
            c.is_flipped = false;
            return c;
        });
    };

    return {
        level,
        cards,
        gameStore,
        flippedCards,
        handleClick,
        startTimer,
        pauseTimer,
        resumeTimer,
        timeRemaining,
        flipsRemaining,
    };
}
