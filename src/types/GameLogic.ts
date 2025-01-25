import {Ref} from "vue";
import {Card} from "@/types/Card.ts";
import {GameData} from "@/types/GameData.ts";

export type GameLogic = {
    level: Ref<number, number>;
    cards: Ref<Card[]>;
    flippedCards: Ref<Card[]>;
    config: GameData;
    timeRemaining: Ref<number>;
    pauseTimer: () => void;
    resumeTimer: () => void;
    handleClick: (card: Card) => void;
    resetTimer: (time: number) => void;
}