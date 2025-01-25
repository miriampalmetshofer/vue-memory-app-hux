import {reactive, ref, watch} from 'vue';
import {useTimer} from '@/composable/useTimer';
import {Card} from "@/types/Card.ts";
import {GameLogic} from "@/types/GameLogic.ts";
import {GameMode} from "@/store/game.ts";
import {useMaxFlips} from "@/composable/useMaxFlips.ts";
import {GameData} from "@/types/GameData.ts";

export function useGameLogic(baseTime: number, baseFlips: number): GameLogic {
    const level = ref<number>(1);
    const cards = ref<Card[]>([]);
    const flippedCards = ref<Card[]>([]);

    const {timeRemaining, setRemainingTime, startTimer} = useTimer(baseTime, gameOver);
    const {flipsRemaining, reduceFlipsAndCheckGameOver} = useMaxFlips(baseFlips, gameOver);

    const config = reactive<GameData>({
        nickname: 'Player1',
        gameMode: GameMode.TIMER,
        level: 1,
    });

    const generateCards = (): void => {
        const numCards = level.value * 2 + 2;
        const newCards: Card[] = Array.from({length: numCards}, (_, index): Card => ({
            id: index,
            image_id: Math.floor(index / 2) + 1,
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
                if (config.gameMode === GameMode.MAX_FLIPS) {
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
        if (config.gameMode === GameMode.TIMER) {
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
        config,
        flippedCards,
        handleClick,
        startTimer,
        timeRemaining,
        flipsRemaining,
    };
}
