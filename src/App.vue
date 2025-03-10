<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col">
      <div class="flex bg-zinc-900 border-b border-zinc-600 text-zinc-50 w-full sticky top-0">
        <div class="flex h-full px-2">
          <img alt="Vue logo" class="block m-1" src="@/assets/DragonHeadLogo.svg" width="50" height="50" />
          <nav class="flex flex-wrap text-base text-left content-center">
            <RouterLink to="/" class="px-3 h-full content-center text-zinc-50 not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Home</RouterLink>
            <RouterLink to="/sources" class="px-3 h-full content-center text-zinc-50 not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Sources</RouterLink>
            <RouterLink to="/monsters" class="px-3 h-full content-center text-zinc-50 not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Monsters</RouterLink>
            <RouterLink to="/spells" class="px-3 h-full content-center text-zinc-50 not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Spells</RouterLink>
            <RouterLink to="/magic-items" class="px-3 h-full content-center text-zinc-50 not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Items</RouterLink>
            <RouterLink to="/create/monster" class="px-3 h-full content-center text-zinc-50 not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">Create New</RouterLink>
            <RouterLink to="/about" class="px-3 h-full content-center text-zinc-50 not-italic hover:no-underline hover:text-purple-300 aria-cur:border-b-2 aria-cur:border-purple-700">About</RouterLink>
          </nav>
        </div>
      </div>
      <section>
        <RouterView/>
      </section>
  </div>
</template>

<style scoped>

</style>
