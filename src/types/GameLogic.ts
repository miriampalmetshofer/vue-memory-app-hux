import {Ref} from "vue";
import {Card} from "@/types/Card.ts";
import {GameData} from "@/types/GameData.ts";

export type GameLogic = {
    level: Ref<number, number>;
    cards: Ref<Card[]>;
    flippedCards: Ref<Card[]>;
    config: GameData;
    handleClick: (card: Card) => void;
}