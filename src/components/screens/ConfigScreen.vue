<script setup lang="ts">
import { useGameStore } from '../../store/game';

const gameStore = useGameStore();

</script>

<template>
  <div>
    <h1>Config Screen</h1>
    <div>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="gameStore.nickname" />
    </div>
    <router-link to="/game">Start Game</router-link>
  </div>
</template>

<style scoped></style>
