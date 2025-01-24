<template>
  <div class="size-full">
    <div class="flex flex-col align-middle items-center p-4">
      <h1 class="text-2xl font-semibold">
        Level: {{ level }}
      </h1>
      <h2 class="text-lg font-semibold">
        Nickname: {{ config.nickname }}
      </h2>
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
import {useGameLogic} from '@/composable/useGameLogic.ts';
import {ref, onMounted, onBeforeUnmount} from 'vue';

const {level, cards, handleClick, config} = useGameLogic();

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
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCardSize);
});
</script>


