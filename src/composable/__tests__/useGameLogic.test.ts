import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import {useGameLogic} from '@/composable/useGameLogic';
import {Card} from "@/types/Card.ts";
import {GameLogic} from "@/types/GameLogic.ts";

describe('useGameLogic', () => {
    let game: GameLogic;

    beforeEach(() => {
        game = useGameLogic(15);
    });

    it('initializes with correct default values', () => {
        expect(game.level.value).toBe(1);
        expect(game.cards.value).toHaveLength(4);
        expect(game.flippedCards.value).toEqual([]);
        expect(game.config.nickname).toBe('Player1');
    });

    it('generates the correct number of cards for the current level', () => {
        game.level.value = 2;
        expect(game.cards.value).toHaveLength(4);

        game.level.value = 3;
        expect(game.cards.value).toHaveLength(4);
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
});
