<script>
export default {
    data() {
        return {
            loading: false,
            monster: null,
            error: null,
        }
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params.id,
            this.fetchData,
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    methods: {
        async fetchData(id) {
            this.error = this.post = null
            this.loading = true
            // replace `getPost` with your data fetching util / API wrapper
            fetch("/db/monsters/id/" + id)
                .then((r) => r.json())
                .then((r) => {
                    this.monster = r;
                })
                .then(() => this.loading = false)
                .catch(error => this.error = error.toString());

        },
    },
}
</script>
<script setup>
import MonsterStatBlock from '../components/MonsterStatBlock.vue';
</script>
<template>
    <div v-if="loading">Loading</div>
    <div v-if="error">We're sorry about that</div>
    <div v-if="monster" class="m-3 flex flex-col items-center">
        <div class="max-w-5xl">
            <h1 class="text-3xl my-3 font-serif">{{ monster.name }}</h1>
            <div
                class="grid w-full px-3 py-6 border border-zinc-600 border-t-4 border-t-purple-600 lg:grid-cols-3 sm:grid-cols-1">
                <MonsterStatBlock class="border border-y-4 border-zinc-600 col-span-2" :monster="monster">
                </MonsterStatBlock>

                <div class="flex flex-col items-center m-2">
                    <img v-fallback="'/src/assets/monster_templates/dndcodex_' + monster.type + '.jpg'"
                        :src="'/src/assets/monster_images/' + monster.id + '.png'"
                        class="bg-zinc-50 rounded-xl p-2 data-[fallback]:bg-transparent data-[fallback]:m-0">
                </div>
            </div>
        </div>
    </div>
</template>