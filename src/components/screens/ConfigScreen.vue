<script setup lang="ts">
import { router } from '../../routing/router'
import { Button } from '@/components/ui/button'
import { useGameStore, GameMode } from '../../store/game'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const gameStore = useGameStore()

const formSchema = toTypedSchema(
  z.object({
    nickname: z.string().min(2).max(50),
    gameMode: z.preprocess(
      (value) => (value === '' ? undefined : value), 
      z.enum([GameMode.MAX_FLIPS, GameMode.TIMER], {
        required_error: 'Game mode is required', 
      })
    ),
  })
);

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  gameStore.updateNickname(values.nickname);
  gameStore.updateGameMode(values.gameMode);
  router.push('/game') 
})
</script>

<template>
  <div class="flex flex-col items-center space-y-6">
    <h1 class="text-3xl font-black">Game Configuration</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">

      <FormField v-slot="{ field }" name="nickname">
        <FormItem>
          <FormLabel>Nickname</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Nickname" v-bind="field" />
          </FormControl>
          <FormDescription>
            This is your nickname for the game.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ field }" name="gameMode">
        <FormItem>
          <FormLabel>Game Mode</FormLabel>
          <FormControl>
            <Select v-bind="field">
              <SelectTrigger>
                <SelectValue placeholder="Select a Game Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Game Mode</SelectLabel>
                  <SelectItem :value="GameMode.MAX_FLIPS">Flip Limit</SelectItem>
                  <SelectItem :value="GameMode.TIMER">Time Limit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>
            This is the game mode you want to play.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex flex-col items-center mt-6">
        <Button type="submit">Start Game</Button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
