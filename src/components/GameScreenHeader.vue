<script setup lang="ts">

import {GameMode} from "@/store/game.ts";

defineProps<{
  level: number,
  nickname: string,
  gameMode: GameMode,
  remainingTime?: number,
  flipsRemaining?: number
}>()
</script>

<template>
  <div class="flex flex-col align-middle items-center p-4">
    <h1 class="text-2xl font-semibold">
      Level: {{ level }}
    </h1>
    <h2 class="text-lg font-semibold">
      Nickname: {{ nickname }}
    </h2>
    <div
      v-if="gameMode === GameMode.TIMER"
      class="text-xl font-medium mt-2"
    >
      Time Remaining: {{ remainingTime }}s
    </div>
    <div
      v-if="gameMode === GameMode.MAX_FLIPS"
      class="text-xl font-medium mt-2"
    >
      Flips Remaining: {{ flipsRemaining }}
    </div>
  </div>
</template>

<style scoped>

</style>