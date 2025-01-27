<script setup lang="ts">
import {useGameLogic} from '@/composable/useGameLogic.ts';
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {DefaultGameModeValues, GameMode} from "@/store/game.ts";

const {
  level,
  cards,
  gameStore,
  handleClick,
  timeRemaining,
  flipsRemaining,
  startTimer,
} = useGameLogic(DefaultGameModeValues.BASE_TIME, DefaultGameModeValues.BASE_MAX_FLIPS);

const cardSize = ref(100);

const updateCardSize = () => {
  const gridSize = Math.ceil(Math.sqrt(cards.value.length));
  const factor = window.innerWidth > 768 ? 0.2 : 0.8; // more padding on desktop
  const containerWidth = window.innerWidth * factor;
  cardSize.value = containerWidth / gridSize;
  console.log('cardSize', cardSize.value);
};

onMounted(() => {
  updateCardSize();
  window.addEventListener('resize', updateCardSize);
  if (gameStore.gameMode === GameMode.TIMER) {
    startTimer();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCardSize);
});
</script>

<template>
  <div class="size-full">
    <div class="flex flex-col align-middle items-center p-4">
      <h1 class="text-2xl font-semibold">
        Level: {{ level }}
      </h1>
      <h2 class="text-lg font-semibold">
        Nickname: {{ gameStore.nickname }}
      </h2>
      <div
        v-if="gameStore.gameMode === GameMode.TIMER"
        class="text-xl font-medium mt-2"
      >
        Time Remaining: {{ timeRemaining }}s
      </div>
      <div
        v-if="gameStore.gameMode === GameMode.MAX_FLIPS"
        class="text-xl font-medium mt-2"
      >
        Flips Remaining: {{ flipsRemaining }}
      </div>
    </div>
    <div class="flex justify-center">
      <div
        class="grid"
        :style="{
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(cards.length))}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${Math.ceil(Math.sqrt(cards.length))}, minmax(0, 1fr))`,
          gap: '0.5rem',
          maxWidth: '100%',
        }"
      >
        <button
          v-for="card in cards"
          :key="card.id"
          class="flex justify-center items-center rounded-lg border-2"
          :disabled="card.is_flipped || card.is_matched"
          :style="{
            width: cardSize + 'px',
            height: cardSize + 'px'
          }"
          @click="handleClick(card)"
        >
          <img
            v-if="card.is_flipped || card.is_matched"
            :src="`/images/card_${card.image_id}.jpg`"
            alt="card"
            class="size-full rounded-lg"
          >
        </button>
      </div>
    </div>
  </div>
</template>


