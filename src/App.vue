<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main min-h-screen flex="~ col justify-center items-center" py-10>
    <h1 text-center font-bold text-5xl pt-10 pb-5>Search with Debounce composable</h1>
    <RouterView />
  </main>
</template>
