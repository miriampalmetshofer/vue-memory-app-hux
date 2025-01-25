<script setup lang="ts">
import { useGameStore } from '@/store/game';

const gameStore = useGameStore();

</script>

<template>
  <div>
    <h1>Game Screen</h1>
    <div>
      <p>Player: {{ gameStore.nickname }}</p>
    </div>
  </div>
</template>

<style scoped></style>