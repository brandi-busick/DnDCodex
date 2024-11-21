<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex content-end px-2 bg-zinc-800 text-zinc-50">
    <img alt="Vue logo" class="block m-1" src="@/assets/DragonHeadLogo.svg" width="50" height="50" />
    <div>
      <nav class="flex flex-wrap text-lg text-left h-full content-center">
        <RouterLink to="/" class="px-3 h-full content-center text-white not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Home</RouterLink>
        <RouterLink to="/monsters" class="px-3 h-full content-center text-white not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Monsters</RouterLink>
        <RouterLink to="/spells" class="px-3 h-full content-center text-white not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Spells</RouterLink>
        <RouterLink to="/items" class="px-3 h-full content-center text-white not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Items</RouterLink>
        <RouterLink to="/create/monster" class="px-3 h-full content-center text-white not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Create New</RouterLink>
        <RouterLink to="/about" class="px-3 h-full content-center text-white not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="bg-zinc-900 text-zinc-200 text-base"/>
</template>

<style scoped>

</style>
