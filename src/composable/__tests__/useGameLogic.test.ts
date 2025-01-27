import {describe, it, expect, beforeEach} from 'vitest';
import {nextTick} from 'vue';
import {useGameLogic} from '@/composable/useGameLogic';
import {Card} from "@/types/Card.ts";
import {GameLogic} from "@/types/GameLogic.ts";
import {GameMode} from "@/store/game.ts";
import {createPinia, setActivePinia} from "pinia";

describe('useGameLogic', () => {
    let game: GameLogic;
    const baseTime = 2;
    const baseFlips = 4;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        game = useGameLogic(baseTime, baseFlips);
    });

    it('initializes with correct default values', () => {
        expect(game.level.value).toBe(1);
        expect(game.cards.value).toHaveLength(4);
        expect(game.flippedCards.value).toEqual([]);
        expect(game.gameStore.nickname).toBe('');
    });

    it('generates the correct number of cards for the current level', async () => {
        expect(game.cards.value).toHaveLength(4);
        game.level.value += 1;
        await nextTick();
        expect(game.cards.value).toHaveLength(6);
    });

    it('shuffles the cards after generation', async () => {
        const originalOrder = [...game.cards.value];
        game.level.value += 1;
        await nextTick();
        const newOrder = [...game.cards.value];
        expect(originalOrder).not.toEqual(newOrder);
    });

    it('flips a card when handleClick is called', () => {
        const card = game.cards.value[0];
        expect(card.is_flipped).toBe(false);

        game.handleClick(card);
        expect(card.is_flipped).toBe(true);
    });

    it('checks for a match and handles matched cards correctly', () => {
        const [card1, card2] = game.cards.value.filter(
            (c) => c.image_id === game.cards.value[0].image_id
        );

        game.handleClick(card1);
        game.handleClick(card2);

        expect(card1.is_matched).toBe(true);
        expect(card2.is_matched).toBe(true);
        expect(game.flippedCards.value).toEqual([]);
    });

    it('handles mismatched cards correctly', async () => {
        const [card1] = game.cards.value;
        const card2 = game.cards.value.find((c) => c.image_id !== card1.image_id);

        game.handleClick(card1);
        game.handleClick(card2!);

        expect(game.flippedCards.value).toHaveLength(2);

        await new Promise((resolve) => setTimeout(resolve, 1100));

        expect(game.flippedCards.value).toEqual([]);
        expect(game.cards.value.every((c: Card) => !c.is_flipped)).toBe(true);
    });

    it('does not allow flipping more than two cards at a time', () => {
        const card1 = game.cards.value[0];
        const card2 = game.cards.value.find((c: Card) => c.image_id !== card1.image_id);
        const card3 = game.cards.value.find((c: Card) => c.id !== card1.id && c.id !== card2!.id); // Take a third card

        game.handleClick(card1);
        game.handleClick(card2!);
        game.handleClick(card3!);

        expect(card3!.is_flipped).toBe(false);
        expect(game.flippedCards.value).toHaveLength(2);
    });

    it('resets flippedCards after a mismatch delay', async () => {
        const [card1] = game.cards.value;
        const card2 = game.cards.value.find((c) => c.image_id !== card1.image_id);

        game.handleClick(card1);
        game.handleClick(card2!);

        await new Promise((resolve) => setTimeout(resolve, 1100));

        expect(game.flippedCards.value).toEqual([]);
        expect(game.cards.value.every((c) => !c.is_flipped)).toBe(true);
    });

    it('level is complete when all cards are matched', async () => {
        await completeLevel(game);
        expect(game.isLevelComplete.value).toBe(true);
    });

    it('increases flips when advancing to the next level in MAX_FLIPS mode', async () => {
        game.gameStore.gameMode = GameMode.MAX_FLIPS;
        game.level.value = 1;

        const initialFlips = game.flipsRemaining.value;
        game.advanceToNextLevel();

        expect(game.flipsRemaining.value).toBe(initialFlips + 5);
    });

    it('increases timer when advancing to the next level in TIMER mode', async () => {
        game.gameStore.gameMode = GameMode.TIMER;
        game.level.value = 1;

        const initialTime = game.timeRemaining.value;
        game.advanceToNextLevel();

        expect(game.level.value).toBe(2);
        expect(game.timeRemaining.value).toBe(initialTime + 5);
    });

    async function completeLevel(game: GameLogic) {
        const pairs: Record<number, Card[]> = {};

        game.cards.value.forEach((card) => {
            if (!pairs[card.image_id]) pairs[card.image_id] = [];
            pairs[card.image_id].push(card);
        });

        for (const pair of Object.values(pairs)) {
            const [card1, card2] = pair as Card[];
            game.handleClick(card1);
            game.handleClick(card2);
            await nextTick();
        }
    }
});
