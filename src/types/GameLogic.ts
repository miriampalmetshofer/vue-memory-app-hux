import {Ref} from "vue";
import {Card} from "@/types/Card.ts";
import {GameData} from "@/types/GameData.ts";

export type GameLogic = {
    level: Ref<number, number>;
    cards: Ref<Card[]>;
    flippedCards: Ref<Card[]>;
    gameStore: GameData;
    timeRemaining: Ref<number>;
    flipsRemaining: Ref<number>;
    pauseTimer: () => void;
    resumeTimer: () => void;
    handleClick: (card: Card) => void;
    startTimer: () => void;
    isLevelComplete: Ref<boolean>;
    advanceToNextLevel: () => void;
}