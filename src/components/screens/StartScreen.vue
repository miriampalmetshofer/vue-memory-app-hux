<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import {router} from '../../routing/router'
import {Button} from '@/components/ui/button'
import GamesTable from '../GamesTable.vue';
import { GAMES_DATA_STORAGE_KEY } from '../../globals/GamesDataStorageKey';
import { GameData } from '../../types/GameData';

const gamesData = ref<GameData[]>([])

onBeforeMount(() => {
  const storageData = localStorage.getItem(GAMES_DATA_STORAGE_KEY);
  gamesData.value = getTopThreeScores(storageData ? JSON.parse(storageData) : [])
})


function getTopThreeScores(games: Game[]) {
  if (games) {
    const sortedGames = games.sort((a, b) => b.level - a.level);
    const topThree = sortedGames.slice(0, 3);
    return topThree;
  } else {
    return [];
  }
}

</script>

<template>
  <div className="flex flex-col items-center space-y-6">
    <h1 class="text-3xl font-black">Start Screen</h1>
    <div>
      <GamesTable v-if="gamesData && gamesData.length > 0" :games-data="gamesData"/>
      <p v-else>No games data available</p>
    </div>
    <Button @click="router.push('/config')">Start</Button>
  </div>

</template>

<style scoped></style>