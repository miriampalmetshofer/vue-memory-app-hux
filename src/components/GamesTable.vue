<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { GameData } from '../types/GameData';

defineProps<{
  gamesData: GameData[]
}>()

</script>

<template>
  <Table>
    <TableCaption>Top Three Games</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Nickname
        </TableHead>
        <TableHead>Game Mode</TableHead>
        <TableHead class="text-right">
          Level
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="gameData in gamesData">
        <TableCell class="font-medium">
          {{ gameData.nickname }}
        </TableCell>
        <TableCell>
            {{ gameData.gameMode }}
        </TableCell>
        <TableCell class="text-right">
          {{ gameData.level }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>