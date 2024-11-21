<script>
export default {
    props: {
        spell: {}
    },
}
</script>
<template>
    <div class="bg-zinc-800 p-4">
        <div class="grid w-full grid-cols-4 gap-4 p-2">
            <div>
                <div>Level</div>
                <div class="text-sm">{{ spell.data.level }}</div>
            </div>
            <div>
                <div>Casting Time</div>
                <div class="text-sm">{{ spell.data.castingTime }}</div>
            </div>
            <div>
                <div>Range</div>
                <div class="text-sm">{{ spell.data.range }}</div>
            </div>
            <div>
                <div>Components</div>
                <div class="text-sm">
                    <span v-for="key in spell.data.components" :key="key">
                        {{ key }}, 
                    </span>
                </div>
            </div>
            <div>
                <div>Duration</div>
                <div class="text-sm">{{ spell.data.duration }}</div>
            </div>
            <div>
                <div>School</div>
                <div class="text-sm">{{ spell.data.school }}</div>
            </div>
            <div>
                <div>Save</div>
                <div v-for="key in spell.data.saveTags" :key="key" class="text-sm">{{ key }}</div>
            </div>
            <div>
                <div>Damage</div>
                <div v-for="key in spell.data.damageTags" :key="key" class="text-sm">{{ key }}</div>
            </div>
        </div>
        <hr class="border-purple-400 py-2">
        <div v-html="spell.data.description" class="compendium"></div>
        <div v-if="spell.data.component" class="text-sm"> * {{ spell.data.component }}</div>
    </div>
</template>