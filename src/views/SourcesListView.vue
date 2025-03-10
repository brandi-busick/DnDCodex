<script setup>
import { filename } from 'pathe/utils';
const sourceglob = import.meta.glob('@/assets/sources/sourcebooks/*.html', { eager: true });
const sourcefiles = Object.fromEntries(
  Object.entries(sourceglob).map(([key, value]) => [filename(key), value.default])
)

const advglob = import.meta.glob('@/assets/sources/adventures/*.html', { eager: true });
const adventurefiles = Object.fromEntries(
  Object.entries(advglob).map(([key, value]) => [filename(key), value.default])
)

</script>
<template>
  <div class="m-3 flex flex-col items-center">
    <div class="max-w-5xl">
      <h2 class="border-b border-zinc-700">Sourcebooks</h2>
      <div class="grid grid-cols-5 gap-4 p-4">
        <div v-for="(value, key) in sourcefiles" :key="key" class=" border border-zinc-600">
          <a :href="'/source/sourcebooks/' + key">{{ key }}</a>
        </div>
      </div>
      <h2 class="border-b border-zinc-700">Adventures</h2>
      <div class="grid grid-cols-5 gap-4 p-4">
        <div v-for="(value, key) in adventurefiles" :key="key" class=" border border-zinc-600">
          <a :href="'/source/adventures/' + key">{{ key }}</a>
        </div>
      </div>
    </div>
  </div>

</template>