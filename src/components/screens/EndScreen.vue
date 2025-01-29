<script setup lang="ts">
import {router} from '@/routing/router'
import {Button} from '@/components/ui/button'
import {GameMode, DefaultGameModeValues} from '@/store/game'
import {onUnmounted} from "vue";
import {useGameLogic} from "@/composable/useGameLogic.ts";

const {
  level,
  resetTimer,
  cards,
  gameStore,
  flipsRemaining,
  flippedCards,
  isLevelComplete,
} = useGameLogic(DefaultGameModeValues.BASE_TIME, DefaultGameModeValues.BASE_MAX_FLIPS);

onUnmounted(() => {
  level.value = 1;
  resetTimer();
  flipsRemaining.value = DefaultGameModeValues.BASE_MAX_FLIPS;
  flippedCards.value = [];
  cards.value = [];
  isLevelComplete.value = false;
})
</script>

<template>
  <div class="flex flex-col items-center space-y-6">
    <h1
        v-if="gameStore.gameMode === GameMode.TIMER"
        class="text-3xl font-black"
    >
      Oops, {{ gameStore.nickname }}! Time's Up!
    </h1>
    <h1
        v-else
        class="text-3xl font-black"
    >
      Oops, {{ gameStore.nickname }}! You've reached the maximum flips!
    </h1>
    <div class="flex flex-col space-y-2">
      <Button @click="router.push('/game')">
        Try Again
      </Button>
      <Button
          variant="outline"
          @click="router.push('/')"
      >
        End
      </Button>
      <Button
          variant="link"
          @click="router.push('/config')"
      >
        Configure Game
      </Button>
    </div>
  </div>
</template>

<style scoped></style>