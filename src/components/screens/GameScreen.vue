<template>
  <div class="size-full">
    <div class="absolute bottom-4 right-4">
      <ConfirmDialog
        :confirm-dialog-data="{
          triggerText: 'Leave Game',
          triggerAction: pauseTimer,
          title: 'Giving up already?',
          description: 'If you leave the game now you will loose your progress. Are you sure you want to leave?',
          actionText: 'Leave Game',
          action: navToStartScreen,
          cancel: resumeTimer,
        }"
      />
    </div>
    <div class="flex flex-col align-middle items-center p-4">
      <h1 class="text-2xl font-semibold">
        Level: {{ level }}
      </h1>
      <h2 class="text-lg font-semibold">
        Nickname: {{ config.nickname }}
      </h2>
      <div
        v-if="config.gameMode === GameMode.TIMER"
        class="text-xl font-medium mt-2"
      >
        Time Remaining: {{ timeRemaining }}s
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


<script setup lang="ts">
import {router} from '@/routing/router';
import {useGameLogic} from '@/composable/useGameLogic.ts';
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {DefaultGameModeValues, GameMode} from "@/store/game.ts";
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const {
  level,
  cards,
  handleClick,
  config,
  timeRemaining,
  pauseTimer,
  resumeTimer
} = useGameLogic(DefaultGameModeValues.BASE_TIME);

const cardSize = ref(100);

const updateCardSize = () => {
  const gridSize = Math.ceil(Math.sqrt(cards.value.length));
  const factor = window.innerWidth > 768 ? 0.2 : 0.8; // more padding on desktop
  const containerWidth = window.innerWidth * factor;
  cardSize.value = containerWidth / gridSize;
  console.log('cardSize', cardSize.value);
};

const navToStartScreen = () => {
  router.push('/');
};

onMounted(() => {
  updateCardSize();
  window.addEventListener('resize', updateCardSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCardSize);
});
</script>


