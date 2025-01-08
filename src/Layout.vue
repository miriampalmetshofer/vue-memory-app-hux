<script setup lang="ts">
import ThemeToggle from "@/components/ThemeToggle.vue";
</script>

<template>
  <header class="w-full flex justify-between p-2">
    <h1 class="text-3xl font-black">Memory</h1>
    <ThemeToggle/>
  </header>
  <main class="flex flex-col items-center justify-center h-screen w-full">
    <slot />
  </main>
</template>
