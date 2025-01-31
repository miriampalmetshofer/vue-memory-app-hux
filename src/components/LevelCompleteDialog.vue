<script setup lang="ts">
import {router} from "@/routing/router.ts";
import {ref} from 'vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const {advanceToNextLevel, isLevelComplete, level} = defineProps<{
  level: number;
  isLevelComplete: boolean;
  advanceToNextLevel: () => void;
}>();

const endGame = ref<boolean>(false);

const handleNextLevel = () => {
  endGame.value = false;
  advanceToNextLevel();
};

const navToStartScreen = () => {
  router.push('/');
};
</script>

<template>
  <ConfirmDialog
    v-if="isLevelComplete"
    :confirm-dialog-data="{
      defaultOpen: true,
      showTrigger: false,
      title:`Level ${level} Complete!`,
      description: `Congratulations, you completed level ${level}. You can now
                advance to the next level or end the game.`,
      actionText: 'Next Level',
      action: handleNextLevel,
      cancelText: 'End Game',
      cancel: () => {endGame = true},
    }"
  />
  <ConfirmDialog
    v-if="endGame"
    :confirm-dialog-data="{
      defaultOpen: true,
      showTrigger: false,
      title: 'End Game',
      description: 'Are you sure you want to end the game?',
      actionText: 'End Game',
      action: navToStartScreen,
      cancelText: 'Next Level',
      cancel: handleNextLevel,
    }"
  />
</template>