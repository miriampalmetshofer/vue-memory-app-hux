import {ref, reactive, watch} from 'vue';
import {GameData} from "@/types/GameData.ts";
import {Card} from "@/types/Card.ts";
import {GameLogic} from "@/types/GameLogic.ts";


export function useGameLogic(): GameLogic {
    const level = ref<number>(1);
    const cards = ref<Card[]>([]);
    const flippedCards = ref<Card[]>([]);

    const config = reactive<GameData>({
        nickname: 'Player1',
        gameMode: 'easy',
        level: 1,
    });

    const generateCards = (): void => {
        const numCards = level.value * 2 + 2;
        const newCards: Card[] = Array.from({length: numCards}, (_, index) => ({
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
        switch (flippedCards.value.length) {
            case 2: {
                return;
            }

            case 1: {
                flipCard(card);
                flippedCards.value.push(card);

                const matched = checkMatch(card);
                if (matched) {
                    handleMatched(card, flippedCards.value[0]);
                    checkEndGame();
                } else {
                    handleMismatch();
                }
                break;
            }

            default: {
                flipCard(card);
                flippedCards.value = [card];
                break;
            }
        }
    };

    const checkEndGame = (): void => {
        const allMatched = cards.value.every((card) => card.is_matched);
        if (allMatched) {
            level.value += 1;
        }
    };

    const checkMatch = (card: Card): boolean =>
        flippedCards.value[0]?.image_id === card.image_id;

    const handleMatched = (card1: Card, card2: Card): void => {
        cards.value = cards.value.map((c) => {
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
        cards.value = cards.value.map((c) => {
            if (c.id === card.id) {
                c.is_flipped = !c.is_flipped;
            }
            return c;
        });
    };

    const flipAllCards = (): void => {
        cards.value = cards.value.map((c) => {
            c.is_flipped = false;
            return c;
        });
    };

    return {
        level,
        cards,
        flippedCards,
        handleClick,
        config
    };
}