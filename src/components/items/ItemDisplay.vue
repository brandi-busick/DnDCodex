<script>
export default {
    props: {
        item: {}
    },
}
</script>
<template>
    <div class="bg-zinc-800 p-4">
        <div class="italic">{{ item.data.metadata }}</div>
        <hr class="border-purple-400 pb-4">
        <div v-html="item.data.description" class="compendium text-base"></div>
        <div class="text-sm italic text-end mt-1">
            {{ item.source }}
        </div>
    </div>
</template>